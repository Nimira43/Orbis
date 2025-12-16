// Seedrandom 
const seedrandom = require('seedrandom')
const seed = 'perc-1'

seedrandom(seed, {global: true})

// Datasets
const trainInputs = [
  [2, 7],
  [3, 6],
  [1, 1],
  [1, 2],
  [2, 1]
]

const testInputs = [
  [2, 6],
  [3, 7],
  [1, 3],
  [2, 2],
  [2, 5],
]

// 1 = pencil, 0 = eraser
const trainLabels = [1, 1, 0, 0, 0]
const testLabels = [1, 1, 0, 0, 1]

// Perceptron Class
class Perceptron {
  constructor(learningRate = 0.1) {
    this.weights = Array(2).fill(0).map(() => 
      Math.random() * 0.5 - 0.2
    )
    this.bias = Math.random() * 0.5 - 0.2
    console.log('WEIGHTS: ', this.weights) 
    this.learningRate = learningRate
  }

   // Step activation: returns 1 if sum >= 0, else 0.
  activationFunction(x) {
    return x >= 0 ? 1 : 0
  }
  
  // Predict: weighted sum + bias → activation.
  predict(inputs) {
    let sum = this.bias
    for (let j = 0; j < inputs.length; j++) {
      sum += inputs[j] * this.weights[j]
    }
    return this.activationFunction(sum)
  }

  // Train: adjust weights/bias if prediction is wrong.
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

  // Accuracy: percentage of correct predictions.
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

// Create Perceptron
const perceptron = new Perceptron(0.07)
const epochs = 9

// Training loop (currently set to training set).
for (let epoch = 0; epoch < epochs; epoch++) {
  perceptron.train(trainInputs, trainLabels)
// one full training pass per epoch

// Accuracy Reports
  const trainingAccuracy = perceptron.calculateAccuracy(trainInputs, trainLabels)
  const testingAccuracy = perceptron.calculateAccuracy(testInputs, testLabels)
  // evaluate performance after each epoch

  console.log(`EPOCH: ${epoch + 1}`)
  console.log(`Training Accuracy: ${trainingAccuracy}%`)
  console.log(`Testing Accuracy: ${testingAccuracy}%`)
  console.log('---------------------------')
}



