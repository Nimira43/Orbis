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

class Perceptron {
  constructor(learningRate = 0.1) {
    this.weights = [0.1, -0.3]
    this.bias = 0.5
    this.learningRate = learningRate
  }
  // Step activation: returns 1 if sum >= 0, else 0.
  activationFunction(x) {
    return (
      x >= 0
        ? 1
        : 0
    )
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

const perceptron = new Perceptron()
const epochs = 10

// Multi‑epoch training loop, logs state each pass.
for (let epoch = 0; epoch < epochs; epoch++) {
  perceptron.train(trainInputs, trainLabels)
  console.log('Epoch: ', epoch)
  console.log(perceptron)
}

// Final accuracy report.
const trainingAccuracy = perceptron.calculateAccuracy(trainInputs, trainLabels)
console.log(`TRAINING ACCURACY: ${trainingAccuracy}%`)
