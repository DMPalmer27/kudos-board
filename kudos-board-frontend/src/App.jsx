import { useState } from 'react'
import { Routes, Route , Link} from 'react-router-dom'
import Home from './HomeComponents/Home'
import Board from './BoardComponents/Board'
import { useTheme } from './ThemeContext'
import './App.css'

function App() {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={theme==='light' ? 'app-light' : 'app-dark'}>
      <header className={theme==='light' ? 'header-light' : 'header-dark'}> 
        <Link to='/'>
          <h1>Kudos Board</h1>
        </Link>
        <button onClick={toggleTheme}>{(theme==='light') ? 'Dark Mode' : 'Light Mode' }</button>

      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/boards/:id" element={<Board/>}/>
        </Routes>
      </main>
      <footer className={theme==='light' ? 'footer-light' : 'footer-dark'}>
        <h5>Codepath Week 3 Kudos Board Project</h5>
      </footer>
    </div>
  )
}

export default App
