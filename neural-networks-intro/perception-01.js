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

// Now defining the perceptron's weights.
// These are the parameters that control how much importance is given to each input feature.
// - weights[0] corresponds to the first feature (x1).
// - weights[1] corresponds to the second feature (x2).
// At the start, we just pick small values (0.1 and 0.3).
// The perceptron will adjust these during training to better separate pencils from erasers.

const weights = [0.1, 0.3] 