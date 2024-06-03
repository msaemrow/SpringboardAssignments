import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VendingMachine from './components/VendingMachine'
import Snack from './components/Snack';
import NavBar from './components/NavBar';

function App() {
  const snacks=[
    {name:"Snickers", price:1.99, qty:10},
    {name:"Celcius", price:1.50, qty:15},
    {name:"Animal Crackers", price:1.00, qty:8}
]

  const snackLinks = snacks.map((snack, index) => ({
    name: snack.name,
    path: `/snack/${index}`
  }))
  return (
    <Router>
      <NavBar snackLinks={snackLinks}/>
      <Routes>
        <Route path="/" element={<VendingMachine snacks={snacks} />}/>
        <Route path="/snack/:id" element={<Snack snacks={snacks} />}/>
      </Routes>
    </Router>
  )
}

export default App
