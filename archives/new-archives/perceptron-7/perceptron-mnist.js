const fs = require('fs')
const seedrandom = require('seedrandom')
const seed = 'perc-1'

seedrandom(seed, {global: true})

class Perceptron {
  constructor(
    inputSize,
    learningRate = 0.1
  ) {
    this.weights = Array(inputSize)
      .fill(0)
      .map(() => 
        Math.random() * 0.3 - 0.1
      )
    this.bias = Math.random() * 0.3 - 0.1 
    this.learningRate = learningRate
  }

  activationFunction(x) {
    return x >= 0 ? 1 : 0
  }
  
  predict(inputs) {
    let sum = this.bias
    for (let j = 0; j < inputs.length; j++) {
      sum += inputs[j] * this.weights[j]
    }
    return this.activationFunction(sum)
  }

  train(trainData, trainLabels) {
    for (let i = 0; i < trainData.length; i++) {
      let inputs = trainData[i]
      const yPredicted = this.predict(inputs)
      const yTrueValue = trainLabels[i]
     
      if (yTrueValue != yPredicted) {
        for (let k = 0; k < this.weights.length; k++) {
          this.weights[k] += this.learningRate * (yTrueValue - yPredicted) * inputs[k] 
        }
        this.bias += this.learningRate * (yTrueValue - yPredicted)
      }
    }
  }

  calculateAccuracy(inputs, labels) {
    let correct = 0
    for (let i = 0; i < inputs.length; i++) {
      const yPredicted = this.predict(inputs[i])
      if (yPredicted === labels[i]) {
        correct++
      }
    }
    return (correct / inputs.length) * 100
  }
}

function shuffleArray(array1, array2) {
  for (let i = array1.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    const temp1 = array1[i]
    array1[i] = array1[j]
    array1[j] = temp1

    const temp2 = array2[i]
    array2[i] = array2[j]
    array2[j] = temp2
  }
}

function findMisclassified(inputs, labels, perceptron) {
  const misclassified = []

  for (let i = 0; i < inputs.length; i++) {
    const prediction = perceptron.predict(inputs[i])

    if (prediction !== labels[i]) {
      misclassified.push({ index: i, image: inputs[i], label: labels[i], prediction})
    }
  }
  return misclassified
}

function displayMisclassified(misclassified) {
  console.log(`Number of misclassified data: ${misclassified.length}`)
  for (const item of misclassified) {
    console.log(`Index: ${item.index}, label: ${item.label}, prediction: ${item.prediction}`)
  }
}

const epochs = 34
const trainBatches = 10
const testBatches = 2
const INPUT_SIZE = 28 * 28
const trainInputs = []
const testInputs = []
const trainLabels = []
const testLabels = []

for (let i = 0; i < trainBatches; i++) {
  const { inputs, labels } = JSON.parse(fs.readFileSync(`./datasets/mnist/train-data-${i}.json`, 'utf8'))
  trainInputs.push(...inputs)
  trainLabels.push(...labels)
}
for (let i = 0; i < testBatches; i++) {
  const { inputs, labels } = JSON.parse(fs.readFileSync(`./datasets/mnist/test-data-${i}.json`, 'utf8'))
  testInputs.push(...inputs)
  testLabels.push(...labels)
}

const perceptron = new Perceptron(INPUT_SIZE, 0.01)

for (let epoch = 0; epoch < epochs; epoch++) {
  shuffleArray(trainInputs, trainLabels)
  perceptron.train(trainInputs, trainLabels)
  const testingAccuracy = perceptron.calculateAccuracy(testInputs, testLabels)
  console.log(`EPOCH: ${epoch + 1}`)
  console.log(`Testing Accuracy: ${testingAccuracy}%`)
  console.log('---------------------------')
}

const misclassified = findMisclassified(testInputs, testLabels, perceptron)
displayMisclassified(misclassified)
