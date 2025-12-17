import Navigation from './components/Navigation'
import Home from './pages/Home'
import PreviewTestImagesPage from './pages/mnist/PreviewTestImages'
import TestPerceptronPage from './pages/mnist/TestPerceptron'

function App() {
  return (
    <>  
      <Navigation />
      <div>
        <Home />
        <PreviewTestImagesPage />
        <TestPerceptronPage />
      </div> 
    </>
  )
}

export default App

