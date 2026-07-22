const fs = require('fs')
const seedrandom = require('seedrandom')
const seed = 'perc-1'

seedrandom(seed, { global: true })

function randomise() {
  return Math.random() * 0.3 - 0.1
}

function mseLoss(outputs, targets) {
  return 0.5 * outputs.reduce((sum, output, i) => sum + (output - targets[i]) ** 2, 0)
}

function normaliseData(data) {
  return (
    data.map(input => input.map(pixel => pixel / 255.0))
  )
}

function oneHotEncode(label) {
  return Array.from({length: 10}, (_, i) => i == label ? 1 : 0)
}

class MLP {
  constructor(inputSize, hiddenSize, outputSize) {
    this.learningRate = 0.01

    this.weightsInputHidden =
      Array.from({
        length: hiddenSize
      }, () =>
        Array.from({
          length: inputSize
        }, randomise)
      )

    this.biasesHidden =
      Array.from({
        length: hiddenSize
      }, randomise)

    this.weightsHiddenOutput =
      Array.from({
        length: outputSize
      }, () =>
        Array.from({
          length: hiddenSize
        }, randomise)
      )

    this.biasesOutput =
      Array.from({
        length: outputSize
      }, randomise)

    this.outputSums = []
    this.outputProbabilities = []
    this.hiddenSums = []
    this.hiddenActivations = []
  }

  reluActivation(z) {
    return (
      Math.max(0, z)
    )
  }

  reluDerivate(z) {
    return z > 0 ? 1 : 0
  }

  softmax(outputs) {
    const maxOutput = Math.max(...outputs)
    const expValues = outputs.map(output => Math.exp(output - maxOutput))
    const sumExpValues = expValues.reduce((sum, val) => sum + val, 0)

    return expValues.map(val => val / sumExpValues)
  }

  forward(inputs) {
    this.hiddenSums = this.weightsInputHidden.map((weights, i) => {
      return weights.reduce((sum, weight, j) =>
        sum + (weight * inputs[j]),
        this.biasesHidden[i]
      )
    })

    this.hiddenActivations = this.hiddenSums.map(
      z => this.reluActivation(z)
    )

    this.outputSums = this.weightsHiddenOutput.map((weights, i) => {
      return weights.reduce((sum, weight, j) =>
        sum + (weight * this.hiddenActivations[j]),
        this.biasesOutput[i]
      )
    })

    this.outputProbabilities = this.softmax(this.outputSums)
    return this.outputProbabilities
  }

  backward(inputs, targets) {
    const outputDeltas = this.outputProbabilities.map(
      (probability, i) => probability - targets[i]
    )

    const hiddenDeltas = this.hiddenSums.map((z, i) => {
      const error = outputDeltas.reduce(
        (sum, delta, j) =>
          sum + delta * this.weightsHiddenOutput[j][i], 0
      )
      return error * this.reluDerivate(z)
    })

    this.weightsHiddenOutput = this.weightsHiddenOutput.map((weights, i) => {
      return weights.map((weight, j) =>
        weight - this.learningRate * outputDeltas[i] * this.hiddenActivations[j]
      )
    })

    this.biasesOutput = this.biasesOutput.map((bias, i) => {
      return bias - this.learningRate * outputDeltas[i]
    })

    this.weightsInputHidden = this.weightsInputHidden.map((weights, i) => {
      return weights.map((weight, j) =>
        weight - this.learningRate * hiddenDeltas[i] * inputs[j]
      )
    })

    this.biasesHidden = this.biasesHidden.map((bias, i) => {
      return bias - this.learningRate * hiddenDeltas[i]
    })
  }

  train(inputs, targets) {
    this.forward(inputs)
    this.backward(inputs, targets)
  }

  saveModel(path) {
    console.log('Preparing data export...')
    const exportData = {
      weightsInputHidden: this.weightsInputHidden,
      biasesHidden: this.biasesHidden,
      weightsHiddenOutput: this.weightsHiddenOutput,
      biasesOutput: this.biasesOutput
    }
    const stringData = JSON.stringify(exportData, null, 2)

    try {
      fs.writeFileSync(path, stringData)
      console.log('Data file saved to: ' + path)
    } catch (e) {
      console.log('Saving data failed: ' + e.message)
    }
  }
}

const epochs = 8
const trainBatches = 2
const testBatches = 2
const trainInputs = []
const testInputs = []
const trainLabels = []
const testLabels = []

for (let i = 0; i < trainBatches; i++) {
  const { inputs, labels } = JSON.parse(fs.readFileSync(`./datasets/mnist/train-data-${i}.json`, 'utf8'))
  trainInputs.push(...normaliseData(inputs))
  trainLabels.push(...labels)
}
for (let i = 0; i < testBatches; i++) {
  const { inputs, labels } = JSON.parse(fs.readFileSync(`./datasets/mnist/test-data-${i}.json`, 'utf8'))
  testInputs.push(...normaliseData(inputs))
  testLabels.push(...labels)
}

const trainLabelsEncoded = trainLabels.map(label => oneHotEncode(label))
const testLabelsEncoded = testLabels.map(label => oneHotEncode(label))

const inputSize = trainInputs[0].length
const hiddenSize = 32
const outputSize = 10

const mlp = new MLP(inputSize, hiddenSize, outputSize)

for (let epoch = 0; epoch <= epochs; epoch++) {
  let totalLoss = 0
  for (let i = 0; i < trainInputs.length; i++) {
    mlp.train(trainInputs[i], trainLabelsEncoded[i])
    totalLoss += mseLoss(mlp.outputProbabilities, trainLabelsEncoded[i])
  }

  if (epoch % 2 == 0) {
    let correctPredictions = 0

    for (let j = 0; j < testInputs.length; j++) {
      const targets = testLabelsEncoded[j]
      const outputProbabilities = mlp.forward(testInputs[j])

      const predicted = outputProbabilities.indexOf(Math.max(...outputProbabilities))
      const target = targets.indexOf(Math.max(...targets))

      if (predicted === target) {
        correctPredictions++
      }
    }

    const accuracy = (correctPredictions / testInputs.length) * 100
    console.log(
      `Epoch: ${epoch} | Accuracy: ${accuracy}% | Loss : ${totalLoss / trainInputs.length} | Correct Predictions: ${correctPredictions}/${testInputs.length}`
    )
  }
}

mlp.saveModel('./frontend/public/mnist/mlp-mnist-mode.json')

