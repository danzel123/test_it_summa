import React, {FC, useContext, useEffect, useRef, useState} from "react";
import {addDir, changeDir, closePopUp, delDir, showPopUp} from "../actions/actions";
import DirectoryContext from "../contexts/DirectoryContext";
import ErrorPopUp from "./ErrorPopUp";

interface IChangePopUp {
    id: string;
    name: string;
    parent_id: string;
}

const ChangePopUp: React.FC<IChangePopUp> = ({id, name, parent_id}) => {
    const direcoryState = useContext(DirectoryContext);
    const dispatch = direcoryState!.dispatch;
    const state = direcoryState!.state;
    const [modDir, setmodDir] = useState({
        name: name,
        id: id,
        parent_id: parent_id,
    });
    const inputEl = useRef<HTMLInputElement>(null);
    const change = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        changeDir(dispatch, modDir);
        closePopUp(dispatch);
    };
    return(
        <div>
            <form onSubmit={change}>
                <h2>Изменить директорию{name}</h2>
                <label htmlFor="name">Имя директории</label>
                <input type="text" name= 'name' value={modDir.name}
                       ref={inputEl} onChange={(val) =>
                    setmodDir({...modDir, name: val.target.value})}/>
                <button type="submit">ОК</button>
                <button onClick={() =>  closePopUp(dispatch)}>Закрыть</button>
            </form>
        </div>
    );
};

export  default ChangePopUp;
