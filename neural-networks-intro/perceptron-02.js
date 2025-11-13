// Define training inputs.
// Each element is a pair [x1, x2], representing two features for one data point.
// Think of them as coordinates in a 2D space that our perceptron will learn to classify.

const trainInputs = [
  [2, 7],
  [3, 6],
  [1, 1],
  [1, 2],
  [2, 1]
]

// Defining the training labels: the 'answers' for each input.
// Here we add meaning: 1 = pencil, 0 = eraser.
// So the perceptron is learning to distinguish pencils from erasers
// based on the input features above.

const trainLabels = [1, 1, 0, 0, 0]

// PERCEPTRON CLASS
// This class bundles together everything the perceptron needs:
// - weights: its current "strategy" for valuing each input feature
// - bias: its baseline tilt before looking at inputs
// - learningRate: how quickly it adjusts when it makes mistakes

class Perceptron {
  constructor(learningRate = 0.1) {
    // Initial weights: small starting values.
    // weight[0] applies to the first feature (x1).
    // weight[1] applies to the second feature (x2).
    // These will be nudged during training to better separate pencils from erasers.

    this.weights = [0.1, -0.3]
    
    // Bias: the perceptron's default leaning.
    // Even if inputs are zero, bias lets it still output something.
    // Starting at 0.5 means it leans slightly toward predicting "pencil."
    
    this.bias = 0.5
    
    // Learning rate: controls the size of adjustments during training.
    // With 0.1, the perceptron learns carefully and gradually.
    
    this.learningRate = learningRate
  }

  // ACTIVATION FUNCTION
  // This is the perceptron's decision ritual.
  // It takes the raw sum (weighted inputs + bias) and turns it into a crisp output:
  // - If the sum is >= 0, predict "pencil" (1).
  // - If the sum is < 0, predict "eraser" (0).
  
  activationFunction(x) {
    return (
      x >= 0
        ? 1
        : 0
    )
  }

  // TRAIN METHOD
  // This method loops through the training data.
  // For each input pair [x1, x2]:
  // - Start with the bias (baseline tilt).
  // - Add the weighted contribution of each input feature.
  // - Apply the activation function to make a prediction.
  // - Compare prediction to the true label.
  // - If wrong, adjust weights and bias using the perceptron learning rule.

  train(trainData, trainLabels) {
    for (let i = 0; i < trainData.length; i++) {
      let sum = this.bias
      let inputs = trainData[i]

      // Multiply each input by its corresponding weight and add to the sum.
      for (let j = 0; j < inputs.length; j++) {
        sum += inputs[j] * this.weights[j]
      }

      // Apply activation function: turn raw sum into a crisp prediction.
      const yPredicted = this.activationFunction(sum)

      // Get the true label for this input.
      const yTrueValue = trainLabels[i]

      // Log the perceptron's thought process for this input.
      console.log(
        `Input: [${inputs.join(', ')}] | Raw sum: ${sum.toFixed(2)} | Predicted: ${yPredicted} | True: ${yTrueValue}`
      )

      // If prediction is wrong, update weights and bias.
      if (yTrueValue != yPredicted) {

        // Adjust each weight:
        // new_weight = old_weight + learningRate * (error) * input
        for (let k = 0; k < this.weights.length; k++) {
          this.weights[k] += this.learningRate * (yTrueValue - yPredicted) * inputs[k] 
        }

        // Adjust bias:
        // new_bias = old_bias + learningRate * (error)
        this.bias += this.learningRate * (yTrueValue - yPredicted)
      }
    }
  }
}

// Create a perceptron instance with default learning rate.
const perceptron = new Perceptron()

// Train the perceptron on the inputs and labels.
// After one pass, weights and bias will be adjusted toward better classification.
perceptron.train(trainInputs, trainLabels)

// Log the perceptron's state after training.
// This shows the updated weights and bias.
console.log(perceptron)
