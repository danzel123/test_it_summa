import axios from "axios";
import React, {useEffect, useReducer, useState} from "react";
import {Context} from "../context";
import reducer from "../newreducer";
import DelPopup from "./DelPopup";
import Directory from "./Directory";

export interface IDirectory {
    id: string;
    name: string;
    parent_id: string;
    visibility?: boolean;
}

const Manager: React.FC = () => {

    // @ts-ignore
    const [state, dispatch] = useReducer(reducer, {dirs: [],
        isLoading: true,
        deeps: {},
        banned: new Set()});
    const [popup, setPopup] = useState({visible: false, id: ""});

    function setDeeps(dirs: IDirectory[]) {
        const deeps = {[dirs[0].id]: 0};
        for (let i: number = 1; i < dirs.length; i++) {
                if (Object.keys(deeps).indexOf(dirs[i].parent_id) !== -1) {
                    deeps[dirs[i].id] = deeps[dirs[i].parent_id] + 1;
                }
                deeps[dirs[i].id] = deeps[dirs[i].parent_id] + 1;
            }

        return dispatch({type: "SET_DEEPS", payload: deeps});
    }

    function updateDirs() {
        axios.get ("http://localhost:3050/rooms")
            .then((response) => response.data.dir)
            .then((dirs) => {dispatch({type: "LOAD_DIRS", payload: dirs}); return dirs; })
            .then((dirs) => setDeeps(dirs));
        dispatch({type: "LOAD_DIRS", payload: []});
    }

    // @ts-ignore
    useEffect(() => {
        updateDirs();
    }, []);
    useEffect(() => {
        console.log(state);
    });
    const visibilityToggle = (id: string, parentId: string) => {
        const banedName = state.banned;
        const box: IDirectory[] = state.dirs;
        // Если индекс уже в невидимых, то делаю предков видимыми
        if (banedName.has(id)) {
            for (let i = 0; i < state.dirs.length; i++) {
                if (id === box[i].parent_id) {
                    box[i].visibility = true;
                }
            }
            // удаляю id предки которого стали видимы
            banedName.delete(id);
        } else {
            // добавляю id предки которого будет невидимы
            banedName.add(id);
            for (let i = 0; i < state.dirs.length; i++) {
                if (banedName.has(state.dirs[i].parent_id)) {
                    // если предок стал невидимый, то его добавляю в список родителей, предки которого будет невидимы
                    banedName.add(state.dirs[i].id);
                    box[i].visibility = false;
                }
            }
        }
        dispatch({type: "SET_BANNED", payload: banedName});

    };
    const showPopup = (item: IDirectory) => {
      setPopup({visible: true, id: item.id});
    };
    const closePopup = () => {
        setPopup({visible: false, id: ""});
    };
    const delDir = (id: string) => {
        console.log(`http://localhost:3050/dir/${id}`);
        axios.delete(`http://localhost:3050/dir/${id}`, {})
            .then((res) =>  updateDirs());

    };
    return (
        <Context.Provider value={{visibilityToggle,
            showPopup, closePopup, delDir}}>
        <>{state.dirs.length ?
            <ul>
                {state.dirs.map((item: IDirectory, i: number) =>
                    <Directory key={i} {...item} deep={state.deeps[item.id]}/>)}
            </ul>
            :
            null
        }
            {popup.visible ?
                <DelPopup id={popup.id}/>
                :
                null}
        </>
        </Context.Provider>
    );
};

export default Manager;
