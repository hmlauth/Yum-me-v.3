import React from "react";
import { ViewBtn } from "../Buttons/ViewBtn";
import "./style.css"

const CarouselCard = (props) => {
    console.log("PROPS", props.onClick)
    // const { id, title, img, dateSaved } = recipe;

    return (
        <div id={`card-${props.key}`} className="card">
            <img src={props.recipe.img} alt={props.recipe.title} className="card-img"/>
            <div className="details">
                <p className="title">
                    {props.recipe.title}<br />
                    {props.recipe.dateSaved}
                </p>
            </div>
            {props.isActive && (
                <a href="/develop">
                <ViewBtn onClick={props.viewVersion}/>
            </a>
            )}
            
            
        </div>
    )
}

export default CarouselCard;