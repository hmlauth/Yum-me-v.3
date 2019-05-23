import React from "react";
import "./List.css";

export const VersionList = props => {
  console.log('VERSION LIST KEY', props.key)
  console.log('VERSION LIST _ID', props._id)
  return (
    <div className="list-overflow-container">
      <li className="list-group version-list-group" id="version-item" onClick={() => props.onClick(props._id)}>
        {props.children}
      </li>
    </div>
  );
};