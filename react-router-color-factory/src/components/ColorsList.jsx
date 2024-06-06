import React from "react";
import { Link } from "react-router-dom";
import "../css/ColorsList.css"

const ColorsList = ({ colors }) => {
    return(
        <div className="ColorsList">
            <h1>Colors</h1>
            <Link className="ColorsList-add-color" to="/colors/new"> Add a new color</Link>
            <ul>
                {colors.map((color, index) => (
                    <li key={index}>
                        <Link className="ColorsList-color" to={`/colors/${color.color}`}>{color.color}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ColorsList;