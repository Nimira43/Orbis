import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/Home.jsx'
import ImagePredictionPage from '../pages/ImagePrediction.jsx'
import PreviewTestImagesPage from '../pages/PreviewTestImages.jsx'

function Router() {
  return (
    <main className='page-root'>
      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />
        <Route
          path='/test-images'
          element={<PreviewTestImagesPage />}
        />
        <Route
          path='/image-prediction'
          element={<ImagePredictionPage />}
        />
      </Routes>
    </main>
  )
}

export default Router