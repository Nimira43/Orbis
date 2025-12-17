import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/Home.jsx'
import TestPerceptronPage from '../pages/TestPerceptron.jsx'
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
          path='/test-perceptron'
          element={<TestPerceptronPage />}
        />
      </Routes>
    </main>
  )
}

export default Router