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

  const numberOfItems = data.readUint32BE(offset)
  // total images stored in this IDX file
  offset += 4

  const row = data.readUint32BE(offset)
  // image height in pixels
  offset += 4

  const cols = data.readUint32BE(offset)
  // image width in pixels
}

// readIdxFile('./datasets/mnist/train-images.idx3-ubyte')
readIdxFile('./datasets/mnist/train-labels.idx1-ubyte')