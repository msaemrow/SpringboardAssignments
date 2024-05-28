import React from "react";
import "../css/Box.css"

function Box({backgroundColor, height, width, onRemove}){
    return(
        <div
         className="Box"
         style={{
            backgroundColor: backgroundColor,
            height: `${height}px`,
            width: `${width}px`
         }}
         >
            <button className="Box-btn" onClick={onRemove} style={{backgroundColor:backgroundColor}}>X</button>
        </div>
    )
}

export default Box;