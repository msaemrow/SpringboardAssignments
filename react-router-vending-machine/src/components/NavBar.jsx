import React from "react";
import { NavLink } from "react-router-dom";
import NavLinkItem from "./NavLinkItem"
import "../css/NavBar.css"

const NavBar = ({ snackLinks }) => {
    return(
        <nav className="NavBar">
            <ul className="NavBar-ul">
              <NavLinkItem to="/" label="Home"/>
              {snackLinks.map((snack, index) => (
                <NavLinkItem key={index} to={snack.path} label={snack.name}/>
              ))}
            </ul>
        </nav>
    )
}

export default NavBar;