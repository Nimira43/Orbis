import { useEffect, useState } from 'react'

function PreviewTestImagesPage() {
  const [mnistData, setMnistData] = useState(null)

  useEffect(() => {
    fetch('/mnist/test-data-0.json')
      .then(response => response.json())
      .then(data => setMnistData(data))
  }, [])

  if (!mnistData) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <div className='page-container'>
        <div className='page-header'>
          Mnist Test Images
        </div>
        <div className='page-content'>
          <div className='image'>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default PreviewTestImagesPage
