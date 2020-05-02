import React, {useContext, useEffect, useState} from "react";
import {Context} from "../context";

export interface DirectoryProps {
    id: string;
    name: string;
    parent_id: string;
    deep: number;
    visibility?: boolean;
}

const Directory = ({id, name, parent_id, deep, visibility}: DirectoryProps) => {

    const {visibilityToggle, showPopup} = useContext(Context);
    if (deep > 3) { deep = 3; }
    const visibilityClass = visibility ? "" : "non-visible";
    return (
      <div className={`item-${deep} ${visibilityClass}`}>
            <li onClick={() => visibilityToggle(id, parent_id)}
                className={``}>{id}, {name}, {parent_id}
           </li>
          <button onClick={() => showPopup({id, name, parent_id})}>Х</button>
          </div>
    );
};

export default Directory;
