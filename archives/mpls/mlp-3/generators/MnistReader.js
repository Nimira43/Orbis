const fs = require('fs')

function readIdxFile(filePath) {
  const data = fs.readFileSync(filePath)
  let offset = 0
  const magicNumber = data.readUint32BE(offset)
  offset += 4
  const numberOfItems = data.readUint32BE(offset)
  offset += 4

  if (magicNumber == 2049) {  
    const labels = []
    for (let i = 0; i < numberOfItems; i++) {
      labels.push(data.readUint8(offset))
      offset += 1
    }
    return { type: 'labels', data: labels}
  } else {
    const rows = data.readUint32BE(offset)
    offset += 4
    const cols = data.readUint32BE(offset)
    offset += 4
    const images = []

    for (let i = 0; i < numberOfItems; i++) {
      const image = []
      for (let r = 0; r < rows; r++) {
        const row = []
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

module.exports = {
  readIdxFile
}