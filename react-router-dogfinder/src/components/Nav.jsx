import React from "react";
import {Link} from 'react-router-dom'
import "../css/Nav.css"

const Nav = ({ dogs }) => {
    return (
        <nav className="NavBar">
            <ul className="NavBar-ul">
                    <li>
                        <Link className="NavLinkItem-a-tag" to="/dogs">DogList</Link>
                    </li>
                {dogs.map(dog => (
                    <li key={dog.name}>
                        <Link className="NavLinkItem-a-tag" to={`/dogs/${dog.name.toLowerCase()}`}>{dog.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Nav;