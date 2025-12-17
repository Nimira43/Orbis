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
      </ul>
    </nav>
  )
}

export default Navigation
