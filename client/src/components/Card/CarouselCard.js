import React from "react";
import moment from "moment";
import { VersionBtn } from "../Buttons/VersionBtn";
import "./style.css"

const CarouselCard = props => {
    return (   
        <div id={`card-${props.recipe.id}`} key={`card-${props.id}`} className="card">
            <img src={props.recipe.img} alt={props.recipe.title} className="card-img"/>
            <div className="details">
                <p className="title">
                    {props.recipe.title}<br />
                    {moment(props.recipe.dateSaved).format('LLL')}
                </p>
            </div>
            {props.isActive && (
                <VersionBtn 
                    recipe={props.recipe}
                    _id={props._id}
                    id={props.id}
                    />
            )}
            
            
        </div>
    )
}

export default CarouselCard;