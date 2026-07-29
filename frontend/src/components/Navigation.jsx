import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className='nav-container'>
      <div className='logo-wrapper'>
        <h1 className='logo'>Orbis</h1>
      </div>

      <button
        className={
          `hamburger ${isOpen ? 'is-open' : ''}`
        }
        onClick={() => setIsOpen(!isOpen)}
        aria-label='Toggle navigation menu'
        aria-expanded={isOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={
        `links-wrapper ${isOpen ? 'is-open' : ''}`
      }>
        <ul>
          <li>
            <Link
              to='/'
              className='link'
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/test-images'
              className='link'
              onClick={closeMenu}
            >
              Preview Test Images
            </Link>
          </li>
          <li>
            <Link
              to='/image-prediction'
              className='link'
              onClick={closeMenu}
            >
              Image Prediction - Binary Network
            </Link>
          </li>
          <li>
            <Link
              to='/image-prediction-mlp'
              className='link'
              onClick={closeMenu}
            >
              Image Prediction - Neural Network
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
