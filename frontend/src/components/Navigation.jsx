function Navigation() {
  return (
    <nav className='nav-container'>
      <div className='logo-wrapper'>
        <h1 className='logo'>Orbis</h1>
      </div>
      <div className='links-wrapper'>
        <ul>
          <li
            className='link'
            onClick={() => alert('Go Home')}
          >
            Home
          </li>
          <li
            className='link'
            onClick={() => alert('Preview Test Images')}
          >
            Images
          </li>
          <li
            className='link'
            onClick={() => alert('Test Perceptron')}
          >
            Perceptron
          </li>
        </ul>
      </div>
      
    </nav>
  )
}

export default Navigation
