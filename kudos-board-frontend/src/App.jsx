import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './HomeComponents/Home'
import Board from './BoardComponents/Board'
import './App.css'

function App() {


  return (
    <div className='App'>
      <header>
        <h1>Kudos Board</h1>
      </header>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/boards/:id" element={<Board/>}/>
      </Routes>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  )
}

export default App
