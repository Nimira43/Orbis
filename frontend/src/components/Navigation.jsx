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
            <Link to='/'>Home</Link>
          </li>
          <li className='link'>
            <Link to='/test-images'>Images</Link>
          </li>
          <li className='link'>
            <Link to='/test-perceptron'>Perceptron</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
