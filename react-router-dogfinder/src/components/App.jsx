import React from 'react';
import { Route, Routes, Navigate} from 'react-router-dom'
import Nav from "./Nav"
import DogList from "./DogList"
import DogDetails from "./DogDetails"
import '../css/App.css'

const defaultDogs = [
  {
    name: "Whiskey",
    age: 5,
    src: "https://media.indiedb.com/images/members/1/361/360683/random_dog.jpg",
    facts: [
      "Whiskey loves eating popcorn.",
      "Whiskey is a terrible guard dog.",
      "Whiskey wants to cuddle with you!"
    ]
  },
  {
    name: "Duke",
    age: 3,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8bvuyYj0iRywhtDKZUA8mHwh330nUm-YpdQ&s",
    facts: [
      "Duke believes that ball is life.",
      "Duke likes snow.",
      "Duke enjoys pawing other dogs."
    ]
  },
  {
    name: "Perry",
    age: 4,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF53l_Elv-I20wwOWGeUNltmV0Vd_Jv3t_hw&s",
    facts: [
      "Perry loves all humans.",
      "Perry demolishes all snacks.",
      "Perry hates the rain."
    ]
  },
  {
    name: "Tubby",
    age: 4,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjZNYkPi7jxsJXTmf23Aaf0sYHzSiXpGVmJw&s",
    facts: [
      "Tubby is really stupid.",
      "Tubby does not like walks.",
      "Angelina used to hate Tubby, but claims not to anymore."
    ]
  }
]


const App = ({ dogs = defaultDogs}) => {
  return (
    <div className='App'>
      <Nav dogs={dogs} />
      <Routes>
        <Route path="/dogs" element={<DogList dogs={dogs}/>} />
        <Route path="/dogs/:name" element={<DogDetails dogs={dogs}/>} />
        <Route path="*" element={<Navigate to="/dogs" />} />
      </Routes>
    </div>
  )
}


export default App
