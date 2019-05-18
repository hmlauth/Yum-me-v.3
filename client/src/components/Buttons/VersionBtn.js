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
        state: {id: props.id}
      }}>
      <button 
        className="btn btn-warn version-btn float-left" >
          Develop
      </button>
    </Link>
  )
}
