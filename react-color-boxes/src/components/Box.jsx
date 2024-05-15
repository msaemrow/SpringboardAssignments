import {React, useState} from 'react';
import "../css/Box.css";

function Box({ color, status }) {
    console.log("Color:", color);
    console.log("Status:", status);
    return (
        <div className="box" style={{backgroundColor:color}}>
            {status &&<span className='Box-status'>{status}</span>}
        </div>
    );
}

export default Box;
