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
        name,
        id,
        parent_id,
    });
    useEffect( () => {setmodDir({...modDir, parent_id, name, id}); }, [id]);
    const inputEl = useRef<HTMLInputElement>(null);
    const change = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        changeDir(dispatch, modDir);
        closePopUp(dispatch);
    };
    return(
            <form onSubmit={change} className={"change-form"}>
                <h2>Изменить директорию </h2>
                <p>{name}</p>
                <div className={"interactive-box"}>
                    <label htmlFor="name">Имя
                    <input type="text" name= "name" value={modDir.name}
                           ref={inputEl} onChange={(val) =>
                        setmodDir({...modDir, name: val.target.value})}/></label>
                    <div className={"buttons-group"}>
                        <button disabled={modDir.name === "" } type="submit">ОК</button>
                        <button onClick={() =>  closePopUp(dispatch)}>Закрыть</button>
                        </div>
                    </div>
            </form>
    );
};

export  default ChangePopUp;
