import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav className='nav-container'>
      <div className='logo-wrapper'>
        <h1 className='logo'>Orbis</h1>
      </div>
      <div className='links-wrapper'>
        <ul>
          <li>
            <Link
              to='/'
              className='link'
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/test-images'
              className='link'
            >
              Images
            </Link>
          </li>
          <li>
            <Link
              to='/test-perceptron'
              className='link'
            >
              Perceptron
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
