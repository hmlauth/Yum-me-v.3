import React from "react";

export const DeleteBtn = props => {
  console.log(props.id);
  console.log(props.onClick)
  return (
    <button className="btn btn-warn delete-btn" 
      onClick={() => props.onClick(props.id)} >
        Delete
    </button>
  )
}
