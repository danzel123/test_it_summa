import React, {useState, useContext, useEffect} from "react";
import {Context} from "../context";

export interface DirectoryProps {
    id: string;
    name: string;
    parent_id: string;
    deep: number,
    visibility?: boolean,
}

const Directory = ({id, name, parent_id, deep, visibility}: DirectoryProps) => {
    const {visibilityToggle} = useContext(Context);
    if (deep > 3) { deep = 3; }
    const visibilityClass = visibility ? "" : "non-visible";
    return (
        <ul>
            <li onClick={() => visibilityToggle(id, parent_id)}
                className={`item-${deep} ${visibilityClass}`}>{id}, {name}, {parent_id}</li>
        </ul>
    );
};

export default Directory;
