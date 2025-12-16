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
  
  if (magicNumber == 2049) {
    // 2049 = IDX label file (no row/col metadata)
    console.log('Label file.')  
  } else {
    // image height in pixels
    const row = data.readUint32BE(offset)
    offset += 4

    // image width in pixels
    const cols = data.readUint32BE(offset)
  }
}

// readIdxFile('./datasets/mnist/train-images.idx3-ubyte')
readIdxFile('./datasets/mnist/train-labels.idx1-ubyte')