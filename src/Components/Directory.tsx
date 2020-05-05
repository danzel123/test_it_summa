import React, {useContext, useEffect, useState} from "react";
import {closePopUp, delDir, showPopUp, visibilityDir} from "../actions/actions";
import DirectoryContext from "../contexts/DirectoryContext";
import {IDirectoryProps} from "../types";
import AddPopUp from "./AddPopUp";
import ChangePopUp from "./ChangePopUp";
import DelPopup from "./DelPopup";

const Directory = ({id, name, parent_id, deep, visibility}: IDirectoryProps) => {
    const [open, setOpen] = useState(true);
    const direcoryState = useContext(DirectoryContext);
    const dispatch = direcoryState!.dispatch;
    const state = direcoryState!.state;
    const visibilityClass = visibility ? "" : "non-visible";
    const parent = state.parents[id].length ? "parent" : null;
    const openClass = open ? "open-tri" : "close-tri";
    useEffect(() => !visibility ? setOpen(false) : undefined);
    console.log(state);
    return (
      <div style={{marginLeft: `${deep * 25}px`}}
           className={`item-box item-${deep} ${visibilityClass} ${parent}`}>
            <li className={`list-item list-item-${deep}`}>
                {parent ? <span className={`triangle ${openClass}`} onClick={() => {
                visibilityDir(dispatch, id, state);
                setOpen(!open);
            }}/> : null}
            {name}</li>
          <div className={"action-blocks"}>
              {parent_id !== "null" ?
                  <span but-title={"Удалить"} className={"action-btn del-btn"}
                     onClick={() => { state.popup.isOpen ? closePopUp(dispatch) :
                                      showPopUp(dispatch, <DelPopup id={id} name={name}/>); }}/> : null}
              <span  but-title={"Добавить"} className={"action-btn add-btn"}
                     onClick={() => {
                                      showPopUp(dispatch, <AddPopUp id={id}/>); }}/>
              <span but-title={"Изменить"} className={"action-btn change-btn"}
                    onClick={() => {
                                     showPopUp(dispatch, <ChangePopUp id={id} parent_id={parent_id} name={name}/>); }}/>
          </div>
          </div>
    );
};

export default Directory;
