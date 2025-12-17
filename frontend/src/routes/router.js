import { useState } from 'react'
import PreviewTestImagesPage from '../pages/mnist/PreviewTestImages'
import HomePage from '../pages/Home'

export function Router() {
  const [pathname, setPathname] = useState(window.location.pathname)

  switch (pathname) {
    case '/test-images':
      return <PreviewTestImagesPage />
    default:
      return <HomePage />
  }
}