import React from "react";
import { VersionBtn } from "../Buttons/VersionBtn";
import "./style.css"

const CarouselCard = props => {
    return (   
        <div key={`card-${props.id}`} className="card">
            <img src={props.recipe.img} alt={props.recipe.title} className="card-img"/>
            <div className="details">
                <p className="title">
                    {props.recipe.title}<br />
                    {props.recipe.dateSaved}
                </p>
            </div>
            {props.isActive && (
                <VersionBtn 
                    recipe={props.recipe}
                    id={props.id}/>
            )}
            
            
        </div>
    )
}

export default CarouselCard;