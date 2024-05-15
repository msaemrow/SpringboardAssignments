import {React, useState} from "react"
import answers from "../answer.json"
import "../css/EightBall.css"


function EightBall(props){
    const originalMsg = {
        msg: "Think of a question",
        color: "white"
    };
    const originalColorCount = {
        goldenrod: 0,
        green: 0,
        red: 0
    }
    const [message, setMessage] = useState(originalMsg);
    const[colorCounts, setColorCount] = useState(originalColorCount);
    const restart =  () => {
        setMessage(originalMsg);
        setColorCount(originalColorCount)
    };

    const updateColorCounts = (color) => {
        setColorCount((colorCounts) => ({
            ...colorCounts,
            [color]: colorCounts[color] + 1
        }));
    };

    const handleClick = () => {
        const idx = Math.floor(Math.random() * answers.length)
        let newMessage = props.answers[idx];
        setMessage(newMessage);
        updateColorCounts(newMessage.color);
    }

    return(
        <>
        <div className="EightBall-color-counts">
            <p className="Eightball-color-counts-title">Color Counts: </p>
            <p>Goldenrod: {colorCounts.goldenrod}</p>
            <p>Green: {colorCounts.green}</p>
            <p>Red: {colorCounts.red}</p>
        </div>
        <div 
        className="EightBall"
        onClick={handleClick}>
            <p 
            className="EightBall-text"
            style={{ backgroundColor: message.color }}>
                {message.msg}
            </p> 
        </div>
        <button className="EightBall-reset" onClick={restart}>Reset</button>
        </>
    )
}

export default EightBall;