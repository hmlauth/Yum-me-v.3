import React from "react";
import "./style.css";

export const Header = ({props, children}) => {
    return <div>
        <h2 className='header'>{children}</h2>
    </div>
}

export default Header;