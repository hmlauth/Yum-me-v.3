import React from "react";


export const SaveBtn = props => {
  console.log(props);
  return (
    <button className="btn btn-success save-btn" 
      onClick={ () => props.onClick(props.recipe)} >
        Save
    </button>
  )
}

