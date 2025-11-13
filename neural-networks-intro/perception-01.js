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