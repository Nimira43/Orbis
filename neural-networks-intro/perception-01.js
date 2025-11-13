// Define training inputs.
// Each element is a pair [x1, x2], representing two features for one data point.
// Think of them as coordinates in a 2D space that our perceptron will learn to classify.
const trainInputs = (
  [2, 7],
  [3, 6],
  [1, 1],
  [1, 2],
  [2, 1]
)

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
    this.weight = [0.1, -0.3]
    // Bias: the perceptron's default leaning.
    // Even if inputs are zero, bias lets it still output something.
    // Starting at 0.5 means it leans slightly toward predicting "pencil."
    this.bias = 0.5
    // Learning rate: controls the size of adjustments during training.
    // With 0.1, the perceptron learns carefully and gradually.
    this.learningRate = learningRate
  }
  train(trainData) {
    for (let i = 0; i < trainData.length; i++) {
      let sum = this.bias
      let inputs = trainData[i]

      for (let j = 0; j < inputs.length; j++)
    }
  }
}

const perceptron = new Perceptron()

perceptron.train(trainInputs)
