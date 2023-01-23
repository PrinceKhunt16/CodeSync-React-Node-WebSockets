import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EditorPage from './pages/EditorPage'
 
export default function App() {
  return ( 
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/editor/:id' element={<EditorPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}