import Navigation from './components/Navigation'
import Home from './pages/Home'

function App() {
  return (
    <div class='app'>
      <div className='logo-wrapper'>
        <h1 className='logo'>Orbis</h1>
      </div>
      <div className='app-container'>
        <Navigation />
        <Home />
      </div>
    </div>
  )
}

export default App

