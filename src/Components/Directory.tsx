import React, {useContext} from "react";
import {delDir, showPopUp, visibilityDir} from "../actions/actions";
import DirectoryContext from "../contexts/DirectoryContext";
import {IDirectoryProps} from "../types";
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
      <div style={{marginLeft: `${deep * 25}px`}} className={`item-box item-${deep} ${visibilityClass}`}>
            <li  onClick={() => {
                visibilityDir(dispatch, id, state);
            }}
                className={`list-item list-item-${deep}`}>{name}
           </li>
          <div className={"action-blocks"}>
              {parent_id !== "null" ? <span className={"action-btn del-btn"} onClick={() => state.popup.isOpen ? null :
                  showPopUp(dispatch, <DelPopup id={id}/>) }></span> : null}
              <span className={"action-btn add-btn"} onClick={() => state.popup.isOpen ? null :
                  showPopUp(dispatch, <AddPopUp id={id}/>) }></span>
              <span className={"action-btn change-btn"} onClick={() => state.popup.isOpen ? null :
                  showPopUp(dispatch, <ChangePopUp id={id} parent_id={parent_id} name={name}/>) }></span>
          </div>
          </div>
    );
};

export default Directory;

