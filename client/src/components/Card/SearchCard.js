import React from "react";
// eslint-disable-next-line
import { PromiseProvider } from "mongoose";
// import "./style.css";

export const SearchCard = ({ children }) => {
    return (
        <div className="card">
        <div className="card-header">
            <h3>Recipe Search</h3>
        </div>
        <div className="card-body">
            {children}
        </div>
        </div>
    )
}


