import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import ColorsList from "./components/ColorsList"
import ColorDetails from "./components/ColorDetails"
import AddColorForm from "./components/AddColorForm"




const App = () => {
  const initialColors = [
    { color: 'Red', hexCode: '#FF0000' },
    { color: 'White', hexCode: '#FFFFFF' },
    { color: 'Blue', hexCode: '#0000FF' },
  ];
  const [colors, setColors] = useState(() => {
    const savedColors = localStorage.getItem('colors');
    return savedColors ? JSON.parse(savedColors) :initialColors;
  })

  useEffect(() => {
    localStorage.setItem('colors', JSON.stringify(colors));
  }, [colors]);

  const addColor = (newColor) => {
    setColors([...colors, newColor])
  }
  return (
    <div>
      <Routes>
        <Route path='/colors' element={<ColorsList colors={colors}/>} />
        <Route path='/colors/new' element={<AddColorForm addColor={addColor}/>} />
        <Route path='/colors/:color' element={<ColorDetails colors={colors}/>} />
        <Route path='*' element={<Navigate to="/colors" />} />
      </Routes>
    </div>

  )
}

export default App
