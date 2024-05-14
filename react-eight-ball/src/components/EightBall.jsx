import {React, useState} from "react"
import answers from "../answer.json"
import "../css/EightBall.css"


function EightBall(props){
    const idx = Math.floor(Math.random() * answers.length)
    const [message, setMessage] = useState({
        msg: "Think of a question",
        color: "white"
    });
    let newMessage = props.answers[idx];
    return(
        <div 
        className="EightBall"
        onClick={()=> setMessage(newMessage)}>
            <p 
            className="EightBall-text"
            style={{ backgroundColor: message.color }}>
                {message.msg}
            </p> 
        </div>
    )
}

export default EightBall;