import React from "react";
import "./List.css";

export const VersionList = props => {
  return (
    <div className="list-overflow-container">
      <li className="list-group version-list-group" id="version-item" onClick={() => props.onClick(props._id)}>
        {props.children}
      </li>
    </div>
  );
};