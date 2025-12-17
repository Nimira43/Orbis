import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav className='nav-container'>
      <div className='logo-wrapper'>
        <h1 className='logo'>Orbis</h1>
      </div>
      <div className='links-wrapper'>
        <ul>
          <li className='link'>
            Home
          </li>
          <li className='link'>
            Images
          </li>
          <li className='link'>
            Perceptron
          </li>
        </ul>
      </div>
      
    </nav>
  )
}

export default Navigation
