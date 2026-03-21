import { useEffect, useState } from 'react'

function PreviewTestImagesPage() {
  const [mnistData, setMnistData] = useState(null)
  const [binaryModel, setBinaryModel] = useState(null)
  const [predictions, setPredictions] = useState([])

  useEffect(() => {
    fetch('/mnist/test-data-0.json')
      .then(response => response.json())
      .then(data => setMnistData(data))
  }, [])

  useEffect(() => {
    fetch('/mnist/binary-data.json')
      .then(response => response.json())
      .then(data => setBinaryModel(data))
  }, [])

  const predict = () => {
    return 1
  }

  const makeAllPredictions = () => {
    if (!binaryModel) {
      return
    }
    const newPredictions = mnistData.inputs.map(image => {
      return predict(image)
    })

    setPredictions(newPredictions)
  }

  const createImageUrl = (inputs) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 28
    canvas.height = 28

    const imageData = ctx.createImageData(28, 28)

    for (let i = 0; i < imageData.height; i++) {
      for (let j = 0; j < imageData.width; j++) {
        const pixelValue = inputs[i][j]
        const idx = (i * imageData.width + j) * 4
        imageData.data[idx] = pixelValue
        imageData.data[idx + 1] = pixelValue 
        imageData.data[idx + 2] = pixelValue
        imageData.data[idx + 3] = 255
      }
    }
    ctx.putImageData(imageData, 0, 0)
    return canvas.toDataURL()
  }

  if (!mnistData) {
    return (
      <div>Loading...</div>
    )
  }

  const { inputs, labels } = mnistData

  return (
    <>
      <div className='page-container'>
        <div className='page-header'>
          Mnist Test Images
        </div>
        <div className='page-content'>
          <div>
            <button 
              class='predictions-btn'
              onClick={makeAllPredictions
                
              }
            >
              Make Predictions
            </button>
          </div>

          <div className='images'>
            {inputs.map((input, index) => (
              <div
                key={index}
                className='image-container'
              >
                <img
                  alt={`Digit ${labels[index]}`}
                  src={createImageUrl(input)}
                />
                <p>
                  Label: {labels[index]}, Index: {index}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default PreviewTestImagesPage
