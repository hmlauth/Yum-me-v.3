import React from "react";
// eslint-disable-next-line
import { PromiseProvider } from "mongoose";
// import "./style.css";

export const ResultsCard = ({ children }) => {
    return <div>
        <div className="card">
        <div className="card-header">
            <h3>Results</h3>
        </div>
        <div className="card-body">
            {children}
        </div>
        </div>
    </div>
}


