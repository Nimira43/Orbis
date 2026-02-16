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
        Math.random() * 0.5 - 0.2
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

const epochs = 100
const trainBatches = 10
const INPUT_SIZE = 28 * 28
const trainInputs = []
const trainLabels = []

for (let i = 0; i < trainBatches; i++) {
  const { inputs, labels } = JSON.parse(fs.readFileSync(`./datasets/mnist/train-data-${i}.json`, 'utf8'))
  trainInputs.push(...inputs)
  trainLabels.push(...labels)
}

const perceptron = new Perceptron(INPUT_SIZE, 0.01)

for (let epoch = 0; epoch < epochs; epoch++) {
  perceptron.train(trainInputs, trainLabels)

  const trainingAccuracy = perceptron.calculateAccuracy(trainInputs, trainLabels)
  // const testingAccuracy = perceptron.calculateAccuracy(testInputs, testLabels)

  console.log(`EPOCH: ${epoch + 1}`)
  console.log(`Training Accuracy: ${trainingAccuracy}%`)
  // console.log(`Testing Accuracy: ${testingAccuracy}%`)
  console.log('---------------------------')
}