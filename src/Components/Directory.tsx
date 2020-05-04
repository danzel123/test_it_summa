import React, {useContext, useEffect, useReducer, useState} from "react";
import {delDir, showPopUp, visibilityDir} from "../actions/actions";
import {Context} from "../context";
import DirectoryContext from "../contexts/DirectoryContext";
import reducer from "../reducers/reducer";
import {IDirectory, IDirectoryProps, IState} from "../types";
import AddPopUp from "./AddPopUp";
import ChangePopUp from "./ChangePopUp";
import DelPopup from "./DelPopup";

const Directory = ({id, name, parent_id, deep, visibility}: IDirectoryProps) => {
    const direcoryState = useContext(DirectoryContext);
    const dispatch = direcoryState!.dispatch;
    const state = direcoryState!.state;
    if (deep > 3) { deep = 3; }
    const visibilityClass = visibility ? "" : "non-visible";
    return (
      <div className={`item-box item-${deep} ${visibilityClass}`}>
            <li onClick={() => {
                visibilityDir(dispatch, id, state);
            }}
                className={`list-item list-item-${deep}`}>{name}
           </li>
          {parent_id !== "null" ? <span className={"action-btn del-btn"} onClick={() => state.popup.isOpen ? null :
              showPopUp(dispatch, <DelPopup id={id}/>) }></span> : null}
          <span className={"action-btn add-btn"} onClick={() => state.popup.isOpen ? null :
              showPopUp(dispatch, <AddPopUp id={id}/>) }></span>
          <span className={"action-btn change-btn"} onClick={() => state.popup.isOpen ? null :
              showPopUp(dispatch, <ChangePopUp id={id} parent_id={parent_id} name={name}/>) }></span>
          </div>
    );
};

export default Directory;

