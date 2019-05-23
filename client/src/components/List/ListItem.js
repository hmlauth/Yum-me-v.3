import React from "react";
import "./List.css";

export const ListItem = ({title, img, children }) => {
    return (
        <div className="row no-gutters">
            <div className="col-md-4">
                <img src={img} className="card-img" alt={title}>
                </img>
            </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">
                            {title}  
                        </h5>
                        {children}
                    </div>
                </div>
            </div>

    )
}