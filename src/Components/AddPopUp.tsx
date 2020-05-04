import React, {FC, useContext, useEffect, useRef, useState} from "react";
import {addDir, closePopUp, delDir, showPopUp} from "../actions/actions";
import DirectoryContext from "../contexts/DirectoryContext";
import ErrorPopUp from "./ErrorPopUp";

interface IDelPopUp {
    id: string;
}

const AddPopUp: React.FC<IDelPopUp> = ({id}) => {
    const direcoryState = useContext(DirectoryContext);
    const dispatch = direcoryState!.dispatch;
    const state = direcoryState!.state;
    const [newDirectory, setNewDirectory] = useState({
        name: "",
        id: new Date().getTime().toString(),
        parent_id: id,
    });
    useEffect( () => {setNewDirectory({...newDirectory, parent_id: id}); }, []);
    const inputEl = useRef<HTMLInputElement>(null);
    const parentName = state.dirs.filter((el) => el.id === newDirectory.parent_id)[0].name;
    const add = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (state.dirs.filter((el) =>
            el.name === newDirectory.name && el.parent_id === newDirectory.parent_id).length !== 0) {
            const err = `Элемент с таким именем уже существует в директории ${parentName}`;
            showPopUp(dispatch, <ErrorPopUp text = {err}/>);
        } else {
            addDir(dispatch, newDirectory);
            closePopUp(dispatch);
        }
    };
    return(
        <div>
            <form onSubmit={add}>
                <h2>Добавить в директорию {parentName}</h2>
                <input type="text" value={newDirectory.name}
                       ref={inputEl} onChange={(val) =>
                    setNewDirectory({...newDirectory, name: val.target.value})}/>
                <button type="submit">ОК</button>
                <button onClick={() =>  closePopUp(dispatch)}>Закрыть</button>
            </form>
        </div>
    );
};

export  default AddPopUp;
