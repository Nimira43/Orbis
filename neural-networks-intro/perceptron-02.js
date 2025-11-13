// Training inputs: pairs of features (x1, x2).
const trainInputs = [
  [2, 7],
  [3, 6],
  [1, 1],
  [1, 2],
  [2, 1]
]
// Training labels: 1 = pencil, 0 = eraser.
const trainLabels = [1, 1, 0, 0, 0]

class Perceptron {
  constructor(learningRate = 0.1) {
    // Initial weights, bias, and learning rate.
    this.weights = [0.1, -0.3]
    this.bias = 0.5
    this.learningRate = learningRate
  }
  // Step activation: outputs 1 if sum >= 0, else 0.
  activationFunction(x) {
    return (
      x >= 0
        ? 1
        : 0
    )
  }

  // NEW: Predict function
  // Encapsulates the calculation of weighted sum + bias,
  // then applies activation to return a classification.
  
  predict(inputs) {
    let sum = this.bias
    for (let j = 0; j < inputs.length; j++) {
      sum += inputs[j] * this.weights[j]
    }
    return this.activationFunction(sum)
  }

  // Training loop: compares predictions to true labels,
  // adjusts weights and bias if wrong.

  train(trainData, trainLabels) {
    for (let i = 0; i < trainData.length; i++) {
      let inputs = trainData[i]
      // refactored to use predict()
      const yPredicted = this.predict(inputs)
      const yTrueValue = trainLabels[i]
     
      if (yTrueValue != yPredicted) {
        // Update weights and bias using perceptron learning rule.
        for (let k = 0; k < this.weights.length; k++) {
          this.weights[k] += this.learningRate * (yTrueValue - yPredicted) * inputs[k] 
        }

        this.bias += this.learningRate * (yTrueValue - yPredicted)
      }
    }
  }

  calculateAccuracy() {
    
  }
}

// Create perceptron, train once, log final state.
const perceptron = new Perceptron()
perceptron.train(trainInputs, trainLabels)
console.log(perceptron)
