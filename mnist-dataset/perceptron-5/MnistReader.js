const fs = require('fs')

// load and parse IDX files
function readIdxFile(filePath) {
  const data = fs.readFileSync(filePath)
  let offset = 0

  // header values
  const magicNumber = data.readUint32BE(offset)
  offset += 4
  const numberOfItems = data.readUint32BE(offset)
  offset += 4

  // label file
  if (magicNumber == 2049) {  
    const labels = []
    for (let i = 0; i < numberOfItems; i++) {
      labels.push(data.readUint8(offset))
      offset += 1
    }
    return { type: 'labels', data: labels}
  } else {

    // image file
    const rows = data.readUint32BE(offset)
    offset += 4
    const cols = data.readUint32BE(offset)
    offset += 4

    const images = []

    // read all images
    for (let i = 0; i < numberOfItems; i++) {
      const image = []

      // read each row
      for (let r = 0; r < rows; r++) {
        const row = []

        // read each pixel
        for (let c = 0; c < cols; c++) {
          row.push(data.readUint8(offset))
          offset += 1
        }
        image.push(row)
      }
      images.push(image)
    }
    return {type: 'images', data: images}
  }
}

// example usage

function saveData(labels, inputs, path) {
  const data = {
    labels,
    inputs
  }

  try {
    
  } catch (e) {
    
  }
}

const testImages = readIdxFile('./datasets/mnist/t10k-images.idx3-ubyte')
const testLabels = readIdxFile('./datasets/mnist/t10k-labels.idx1-ubyte')




