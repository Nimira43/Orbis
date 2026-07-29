import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/Home.jsx'
import PreviewTestImagesPage from '../pages/PreviewTestImages.jsx'
import ImagePredictionPage from '../pages/ImagePrediction.jsx'
import ImagePredictionMlpPage from '../pages/ImagePredictionMlp.jsx'

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
        <Route
          path='/image-prediction-mlp'
          element={<ImagePredictionMlpPage />}
        />
      </Routes>
    </main>
  )
}

export default Router