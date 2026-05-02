import { useEffect, useRef, useState } from 'react'

const WIDTH = 28
const HEIGHT = 28
const SCALE = 10

function ImagePredictionPage() {
  const [binaryModel, setBinaryModel] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const canvasRef = useRef(null)
  const isDrawingRef = useRef(false)

  useEffect(() => {
    fetch('/mnist/binary-model.json')
      .then(response => response.json())
      .then(data => setBinaryModel(data))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = WIDTH
    canvas.height = HEIGHT
    canvas.style.width = `${canvas.width * SCALE}px`
    canvas.style.height = `${canvas.height * SCALE}px`

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 1.5

    const startDrawing = (event) => {
      const { offsetX, offsetY } = event
      const scaledX = offsetX / SCALE
      const scaledY = offsetY / SCALE

      ctx.beginPath()
      ctx.moveTo(scaledX, scaledY)
      isDrawingRef.current = true
    }
    const draw = (event) => {
      if (!isDrawingRef.current) return
      const { offsetX, offsetY } = event
      const scaledX = offsetX / SCALE
      const scaledY = offsetY / SCALE

      ctx.lineTo(scaledX, scaledY)
      ctx.stroke()
    }
    const stopDrawing = () => {
      ctx.closePath()
      isDrawingRef.current = false
    }

    canvas.addEventListener('mousedown', startDrawing)
    canvas.addEventListener('mousemove', draw)
    canvas.addEventListener('mouseup', stopDrawing)
    canvas.addEventListener('mouseout', stopDrawing)
  
    return () => {
      canvas.addEventListener('mousedown', startDrawing)
      canvas.addEventListener('mousemove', draw)
      canvas.addEventListener('mouseup', stopDrawing)
      canvas.addEventListener('mouseout', stopDrawing)
    }
  }, [])

  const normaliseData = (pixel) => pixel / 255.0

  const preprocessCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT)
    const greyScaleData = []

    for (let i = 0; i < imageData.data.length; i += 4) {
      greyScaleData.push(imageData.data[i])
    }
    return greyScaleData
  }

  const activationFunction = (sum) => {
    return sum >= 0 ? 1 : 0
  }

  const predict = () => {
    const inputs = preprocessCanvas()
      .map(pixel => normaliseData(pixel))
    let sum = binaryModel.bias

    binaryModel.weights.forEach((weight, i) => {
      sum += weight * inputs[i]
    })

    const prediction = activationFunction(sum)
    setPrediction(prediction)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    setPrediction(null)
  }

  const saveToTrainingSet = (label) => {
    const input = preprocessCanvas()
    const misclassifiedData = { input, label }
  }

  return (
    <div className='page-container'>
      <div className='page-header'>
        Image Prediction - Binary Perceptron
      </div>
      <div className='page-content'>
        <canvas
          className='image-prediction-canvas'
          ref={canvasRef}
        />
      </div>
      <div className='button-container'>
        <button
          className='main-btn'
          onClick={clearCanvas}
        >
          Clear
        </button>
        <button
          className='main-btn'
          onClick={predict}
        >
          Prediction
        </button>
      </div>
      {prediction !== null && (
          <div>
            Prediction: 
            <span className='prediction-result'>
              {prediction === 1
                ? 'Number is 0'
                : 'Number is from 1 to 9'
              }
            </span>
            <div className='button-container'>
            <button
              className='main-btn'
              onClick={
                () => saveToTrainingSet(1)
              }
            >
              Save: Label 1
            </button>
            <button
              className='main-btn'
              onClick={
                () => saveToTrainingSet(0)
              }
            >
              Save: Label 0
            </button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ImagePredictionPage