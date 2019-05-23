import React from "react";
import { Link } from "react-router-dom";


export const VersionBtn = props => {
  return (
    <Link to={{
        pathname: '/develop', 
        state: {
          _id: props._id,
          id: props.id
        }
      }}>
      <button 
        className="btn btn-warn version-btn float-left" >
          Develop
      </button>
    </Link>
  )
}
