import {React, useState} from 'react';
import Box from  './Box';
import '../css/BoxContainer.css'

function BoxContainer(){

    const getRandomColor = () => {
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'aqua'];
        return colors[Math.floor(Math.random() * colors.length)]
    }

    const [boxColors, setBoxColors] = useState(Array(16).fill('').map(() => ({color:  getRandomColor(), status: null})));
    const [lastChangedIndex, setLastChangedIndex] = useState(null);

    const changeColor = () => {
        const randomBox = Math.floor(Math.random() * boxColors.length);
        const newBoxColors = [...boxColors];
        if(lastChangedIndex !== null){
            newBoxColors[lastChangedIndex] = {...newBoxColors[lastChangedIndex], status: null}
        }
        newBoxColors[randomBox] = { ...newBoxColors[randomBox], color: getRandomColor(), status: "Changed" }
        setBoxColors(newBoxColors);
        setLastChangedIndex(randomBox);
    }
    return (
        <>
        <div className='BoxContainer'>
            {boxColors.map(({color, status}, index) =>
            <Box key={index} color={color} status={status}/>
            )}
        </div>
        <button className='BoxContainer-change-btn' onClick={changeColor}>Change Random Color</button>
        </>
    )
}

export default BoxContainer;