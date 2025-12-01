// TRAINING + TEST DATA
// Recap: same pencil/eraser dataset as before.
// NEW: Both training and test sets are defined side by side.
// This sets the stage for evaluating generalisation.

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

const trainLabels = [1, 1, 0, 0, 0]
const testLabels = [1, 1, 0, 0, 1]

// PERCEPTRON CLASS
class Perceptron {
  constructor(learningRate = 0.1) {
    // Recap: initial weights, bias, learning rate.
    // NEW: Instead of fixed starting values, weights and bias are randomised.
    // This prevents the perceptron from always starting with the same tilt,
    // encouraging exploration of different decision boundaries.
    this.weights = Array(2).fill(0).map(() => 
      Math.random() * 0.5 - 0.2  // random value between -0.2 and +0.3
    )
    this.bias = Math.random() * 0.5 - 0.2
    console.log(this.weights) // log initial random weights for transparency
    this.learningRate = learningRate
  }

  // Recap: step activation function.
  activationFunction(x) {
    return (x >= 0 ? 1 : 0)
  }
  
  // Recap: predict = weighted sum + bias → activation.
  predict(inputs) {
    let sum = this.bias
    for (let j = 0; j < inputs.length; j++) {
      sum += inputs[j] * this.weights[j]
    }
    return this.activationFunction(sum)
  }

  // Recap: train = adjust weights/bias if prediction is wrong.
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

  // Recap: accuracy = percentage of correct predictions.
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

// CREATE PERCEPTRON
const perceptron = new Perceptron()
const epochs = 10

// NEW: Flexible training loop.
// Comment explains how to switch between datasets (train vs test).
// Currently set to trainInputs/trainLabels.
for (let epoch = 0; epoch < epochs; epoch++) {
  perceptron.train(trainInputs, trainLabels)
  console.log('Epoch: ', epoch)
  console.log(perceptron)
}

// ACCURACY REPORTS
// NEW: Both training and testing accuracy available.
// Testing accuracy line is commented out for now.
const trainingAccuracy = perceptron.calculateAccuracy(trainInputs, trainLabels)
// const testingAccuracy = perceptron.calculateAccuracy(testInputs, testLabels)

console.log(`TRAINING ACCURACY: ${trainingAccuracy}%`)
// console.log(`TESTING ACCURACY: ${testingAccuracy}%`)
