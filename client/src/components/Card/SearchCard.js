import React from "react";
import { SaveBtn } from "../Buttons/SaveBtn";
import { ViewBtn } from "../Buttons/ViewBtn";
import "./style.css"

const SearchCard = props => {
    console.log(props);
    const { key, recipe, onClick, sourceUrl } = props;

    return (
        <div id={`card-${key}`} className="card">
            <img src={recipe.img} alt={recipe.title} className="card-img"/>
            <div className="details">
                <p className="title">
                    {recipe.title}<br />
                </p>
                <SaveBtn recipe={recipe} onClick={onClick}>
                    Save
                </SaveBtn>
                <ViewBtn link={sourceUrl}>
                    View Recipe
                </ViewBtn>
            </div>
        </div>
    )
}

export default SearchCard;