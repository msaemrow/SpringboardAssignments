import { useState } from 'react'
import './App.css'
import BoxList from "./components/BoxList"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Create a color box!</h1>
      <BoxList />
    </div>

  )
}

export default App
