import React from "react";
import '../css/Snack.css'
import {Link, useParams} from 'react-router-dom'

const Snack = ({ snacks }) => {
    const {id}=useParams();
    const snack = snacks[id]

    if(!snack){
        return <h3>No Snack Found</h3>
    }

    return(
        <div className="snack">
            <h3 className="snack-name">{snack.name}</h3>
            <h5 className="snack-price">${snack.price}</h5>
            <h5 className="snack-qty">Num Remaining: {snack.qty}</h5>
            <Link className="snack-home-link" to="/">Return to Vending Machine</Link>
        </div>
        
    )
}

export default Snack;