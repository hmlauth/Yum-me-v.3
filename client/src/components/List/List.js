import React from "react";
import "./List.css";

export const List = ({ key, children }) => {
  console.log('List', key)
  return (
    <div className="list-overflow-container">
      <ul className="list-group" key={key}>
        {children}
      </ul>
    </div>
  );
};