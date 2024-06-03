import React from "react";
import { NavLink } from "react-router-dom";
import "../css/NavLinkItem.css"

const NavLinkItem = ({ key, to, label }) =>  {
    return(
        <li className="NavLinkItem">
        <NavLink
            to={to}
            className={({isActive}) => (isActive ? 'NavLinkItem-a-tag active' : 'NavLinkItem-a-tag')}
            end={to === '/'}
        >
            {label}    
        </NavLink>
    </li>
    );
};

export default NavLinkItem;