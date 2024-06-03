import React from "react";
import Snack from "./Snack"
import {Link} from "react-router-dom"
import '../css/VendingMachine.css'

function VendingMachine({ snacks}){

    return(
        <div className="vending-machine">
            <h1>Vending Machine!</h1>
            <ul>
                {snacks.map((snack, index) => (
                    <li key={index}>
                        <Link className="vending-machine-snack-link" to={`/snack/${index}`}>{snack.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default VendingMachine;