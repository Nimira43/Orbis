import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/Home.jsx'
import PreviewTestImages from '../pages/PreviewTestImages.jsx'


function Router() {
  return (
    <main className='page-root'>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/test-images' element={<PreviewTestImages />}/>
      </Routes>
    </main>
  )
}

export default Router