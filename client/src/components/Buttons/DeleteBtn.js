import React from "react";

export const DeleteBtn = props => {
  const { _id } = props;
  return (
    <button className="btn delete-btn"
      onClick={() => props.onClick(_id)} >
        Delete
    </button>
  )
}
