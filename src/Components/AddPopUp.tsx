import React, {FC, useContext, useEffect, useRef, useState} from "react";
import {addPopUp, closePopUp, delDir} from "../actions/actions";
import DirectoryContext from "../contexts/DirectoryContext";

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

    console.log(newDirectory.parent_id);
    const inputEl = useRef<HTMLInputElement>(null);
    const addDir = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (state.dirs.filter((el) => el.name === newDirectory.name && el.parent_id === newDirectory.parent_id).length) {
            console.log(state.dirs.filter((el) => el.name === newDirectory.name && el.parent_id === newDirectory.parent_id))
            alert("такой уже есть");
        } else {
            addPopUp(dispatch, newDirectory);
            closePopUp(dispatch);
        }
    };
    return(
        <div>
            <form onSubmit={addDir}>
                <h2>Добавить в директорию {id}</h2>
                <input type="text" value={newDirectory.name}
                       ref={inputEl} onChange={(val) =>
                    setNewDirectory({...newDirectory, name: val.target.value})}/>
                <button type="submit">ОК</button>
            </form>
        </div>
    );
};

export  default AddPopUp;
