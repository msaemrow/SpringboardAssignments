import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import answers from "./answer.json"
import EightBall from './components/EightBall'


function App() {
  return (
    <>
      <h1 className='App-header'>Magic 8 Ball!</h1>
      <p className='App-instructions'>Click the edge of the ball to reveal your answer</p>
      <EightBall answers={answers} />
    
    </>
  )
}

export default App
