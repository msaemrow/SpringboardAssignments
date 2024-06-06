import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import "../css/ColorDetails.css"


const ColorDetails = ({colors}) => {
    const { color } = useParams();
    const colorDetails = colors.find(c => c.color.toLowerCase() === color.toLowerCase())

    if(!colorDetails) return <Navigate to="/colors"/>

    return(
        <div className="ColorDetails" style={{backgroundColor: colorDetails.hexCode, width: '500px', height: '500px' }}>
            <h1 className="ColorDetails-name">{colorDetails.color}</h1>
            <h4 className="ColorDetails-hexcode">Hex Code: {colorDetails.hexCode}</h4>
            <Link className="ColorDetails-return-home" to="/colors">Return to all colors</Link>
        </div>
    )
}


export default ColorDetails;