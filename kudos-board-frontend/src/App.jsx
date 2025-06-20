import { useState } from 'react'
import { Routes, Route , Link} from 'react-router-dom'
import Home from './HomeComponents/Home'
import Board from './BoardComponents/Board'
import './App.css'

function App() {


  return (
    <div className='App'>
      <header> 
        <Link to='/'>
          <h1>Kudos Board</h1>
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/boards/:id" element={<Board/>}/>
      </Routes>
      <footer>
        <h3>Daniel's Kudos Board</h3>
      </footer>
    </div>
  )
}

export default App
