import React from "react";
import { Link } from "react-router-dom";

const ColorsList = ({ colors }) => {
    return(
        <div>
            <h1>Colors</h1>
            <ul>
                {colors.map((color, index) => (
                    <li key={index}>
                        <Link to={`/colors/${color.color}`}>{color.color}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/colors/new"> Add a new color</Link>
        </div>
    )
}

export default ColorsList;