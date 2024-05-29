import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Deck from "./components/Deck"
import Deckv2 from "./components/Deckv2"

// Deck is a manual card draw component
// Deckv2 is an automatic card draw component

function App() {
  return (
    <>
      <h1 className='App-title'>AUTOMATIC CARD DRAW</h1>
      <Deckv2 />
    </>
  )
}

export default App
