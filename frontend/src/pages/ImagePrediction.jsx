import { useEffect, useRef, useState } from 'react'

const WIDTH = 28
const HEIGHT = 28
const SCALE = 10

function ImagePredictionPage() {
  const [binaryModel, setBinaryModel] = useState(null)
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
    ctx.lineWidth = 1.7

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
        <button className='main-btn'>
          Clear
        </button>
        <button className='main-btn'>
          Prediction
        </button>
      </div>
      <div>
        Prediction:
      </div>
    </div>
  )
}

export default ImagePredictionPage