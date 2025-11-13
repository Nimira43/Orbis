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

// Next, define the labels (the 'answers') for each input.
// These are the target outputs the perceptron should learn to predict.
// 1 means the input belongs to the positive class, 0 means the negative class.
// The order of labels matches the order of inputs above.

const trainLabels = [1, 1, 0, 0, 0]