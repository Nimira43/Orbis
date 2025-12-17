function Navigation() {
  return (
    <nav>
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
          Preview Test Images
        </li>
        <li
          className='link'
          onClick={() => alert('Test Perceptron')}
        >
          Test Perceptron
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
