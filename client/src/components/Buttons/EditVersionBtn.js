import React from "react";

export const EditVersionBtn = props => {
    return <button 
        className="btn btn-success edit-version-btn" 
        onClick={props.onClick}>
            {props.children}
    </button>
}