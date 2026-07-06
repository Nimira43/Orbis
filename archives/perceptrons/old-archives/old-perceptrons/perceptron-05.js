const trainInputs = [
  [2, 7],
  [3, 6],
  [1, 1],
  [1, 2],
  [2, 1],
]

const testInputs = [
  [2, 6],
  [3, 7],
  [1, 3],
  [2, 2],
  [2, 5],
]

// Pencil = 1
// Eraser = 0

const trainLabels = [1, 1, 0, 0, 0]
const testLabels = [1, 1, 0, 0, 1]

class Perceptron {
  constructor(learningRate = 0.1) {
    this.weights = Array(2).fill(0).map(() => Math.random() * 0.5 - 0.2)
    this.bias = Math.random() * 0.5 - 0.2
    this.learningRate = learningRate
  }
  activationFunction(x) {
    return x >= 0 ? 1 : 0
  }
  predict(inputs) {
    let sum = this.bias
    for (let j = 0; j < inputs.length;  j++) {
      sum += inputs[j] * this.weights[j]
    }  
    return this.activationFunction(sum)
  }
  train(trainData, trainLabels) {
    for (let i = 0; i < trainData.length; i++) {
      let inputs = trainData[i]
      const yp = this.predict(inputs)
      const yt = trainLabels[i]
      if (yt != yp) {
        for (let k = 0; k < this.weights.length; k++) {
          this.weights[k] += this.learningRate * (yt - yp) * inputs[k]
        }
        this.bias += this.learningRate * (yt - yp)
      }
    }
  }
  calculateAccuracy(inputs, labels) {
    let correct = 0
    for (let i =0; i < inputs.length; i++) {
      const yp = this.predict(inputs[i])
      if (yp === labels[i]) {
        correct++
      }
    }
    return (correct / inputs.length) * 100
  }
}

const perceptron = new Perceptron()
const epochs = 10
for (let epoch = 0; epoch < epochs; epoch++) {
  perceptron.train(trainInputs, trainLabels)
}

const trainingAccuracy = perceptron.calculateAccuracy(trainInputs, trainLabels)

const testingAccuracy = perceptron.calculateAccuracy(testInputs, testLabels)

console.log('----------------------------------------')
console.log(perceptron)
console.log('----------------------------------------')
console.log(`Training Accuracy: ${trainingAccuracy}% `)
console.log('----------------------------------------')
console.log(`Testing Accuracy: ${testingAccuracy}% `)
console.log('----------------------------------------')
