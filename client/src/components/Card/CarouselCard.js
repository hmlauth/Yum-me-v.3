import React from "react";
import "./style.css"

const CarouselCard = ({recipe}) => {
    console.log(recipe);
    const { id, title, img, dateSaved } = recipe;
    return (
        <div id={`card-${id}`} className="card">
            <img src={img} alt={title} className="card-img"/>
            <div className="details">
                <p className="title">
                    {title}<br />
                    {dateSaved}
                </p>
            </div>
        </div>
    )
}

export default CarouselCard;