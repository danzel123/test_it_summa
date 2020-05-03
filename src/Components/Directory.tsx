import React, {useContext, useEffect, useReducer, useState} from "react";
import {delDir, showPopUp, visibilityDir} from "../actions/actions";
import {Context} from "../context";
import DirectoryContext from "../contexts/DirectoryContext";
import reducer from "../reducers/reducer";
import {IDirectory, IDirectoryProps, IState} from "../types";
import AddPopUp from "./AddPopUp";
import DelPopup from "./DelPopup";

const Directory = ({id, name, parent_id, deep, visibility}: IDirectoryProps) => {
    const direcoryState = useContext(DirectoryContext);
    const dispatch = direcoryState!.dispatch;
    const state = direcoryState!.state;
    if (deep > 3) { deep = 3; }
    const visibilityClass = visibility ? "" : "non-visible";
    return (
      <div className={`item-${deep} ${visibilityClass}`}>
            <li onClick={() => {
                visibilityDir(dispatch, id, state);
            }}
                className={``} style={{backgroundColor: "grey", width: '100px'}}>{name}
           </li>
          <span onClick={() => showPopUp(dispatch, <DelPopup id={id}/>) }> X</span>
          <span onClick={() => showPopUp(dispatch, <AddPopUp id={id}/>) }> Добавить</span>
          </div>
    );
};

export default Directory;
