const fs = require('fs')

// readIdxFile: loads raw IDX binary file into a Buffer
function readIdxFile(filePath) {
  
  // read entire IDX file into memory
  const data = fs.readFileSync(filePath)
  
  // pointer for stepping through the binary structure
  let offset = 0

  // first 4 bytes = magicNumber (identifies IDX file type)
  const magicNumber = data.readUint32BE()
  offset += 4

  // total images stored in this IDX file
  const numberOfItems = data.readUint32BE(offset)
  offset += 4

  // 2049 = IDX label file (no row/col metadata)
  if (magicNumber == 2049) {  
    const labels = []

    for (let i = 0; i < numberOfItems; i++) {
      // each label is a single unsigned byte
      labels.push(data.readUint8(offset))
      offset += 1
    }

    // return parsed label array with a simple descriptor
    return { type: 'labels', data: labels}

  } else {
    // image height in pixels
    const row = data.readUint32BE(offset)
    offset += 4

    // image width in pixels
    const cols = data.readUint32BE(offset)
  }
}

// readIdxFile('./datasets/mnist/train-images.idx3-ubyte')
const trainLabels = readIdxFile('./datasets/mnist/train-labels.idx1-ubyte')