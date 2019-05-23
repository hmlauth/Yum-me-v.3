import React from "react";
import { 
  BrowserRouter,
  Switch,
  Route,
  Link,
  NavLink} from "react-router-dom";


export const VersionBtn = props => {
  return (
    <Link to={{
        pathname: '/develop', 
        state: {_id: props.id}
      }}>
      <button 
        className="btn btn-warning version-btn float-left" >
          Develop
      </button>
    </Link>
  )
}
