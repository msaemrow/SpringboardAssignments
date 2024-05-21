import './App.css'
import Board from "./Board"

function App() {
  return (
    <Board nrows={3} ncols={3} chanceLightStartsOn={0.50}/>
  )
}

export default App
