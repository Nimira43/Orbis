const fs = require('fs')

// readIdxFile: loads raw IDX binary file into a Buffer
function readIdxFile(filePath) {
  
  // read entire IDX file into memory
  const data = fs.readFileSync(filePath)
  
  // pointer for stepping through the binary structure
  let offset = 0

  // first 4 bytes = magicNumber (identifies IDX file type)
  const magicNumber = data.readUInt32BE()
  console.log(magicNumber)
}

readIdxFile('./datasets/mnist/train-images.idx3-ubyte')