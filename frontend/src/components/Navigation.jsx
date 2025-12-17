function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <div
            className='link'
            onClick={() => alert('Go Home')}
          >
            Home
          </div>
        </li>
        <li>
          <div
            className='link'
            onClick={() => alert('Preview Test Images')}
          >
            Preview Test Images
          </div>
        </li>
        <li>
          <div
            className='link'
            onClick={() => alert('Test Perceptron')}
          >
            Test Perceptron
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
