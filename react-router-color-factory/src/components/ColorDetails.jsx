import React from "react";
import { useParams, Navigate } from "react-router-dom";


const ColorDetails = ({colors}) => {
    const { color } = useParams();
    const colorDetails = colors.find(c => c.name.toLowerCase() === color.toLowerCase())

    if(!color) return <Navigate to="/colors"/>
    return(
        <div className="ColorDetails" style={{backgroundColor: colorDetails.hexCode, width: '500px', height: '500px' }}>
            <h1 className="ColorDetails-name">{colorDetails.name}</h1>
            <h4 className="ColorDetails-hexcode">Hex Code: {colorDetails.hexCode}</h4>
        </div>
    )
}


export default ColorDetails;