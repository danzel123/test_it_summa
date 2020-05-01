import axios from "axios";
import groupBy from "lodash/groupBy";
import some from "lodash/some";
import React, {useEffect, useReducer, useState} from "react";
import {Context} from "../context";
import reducer from "../newreducer";
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
    function setDeeps(dirs: IDirectory[]) {
        console.log(dirs);
        const deeps = {[dirs[0].id]: 0};
        for (let i: number = 1; i < dirs.length; i++) {
                if (Object.keys(deeps).indexOf(dirs[i].parent_id) !== -1) {
                    deeps[dirs[i].id] = deeps[dirs[i].parent_id] + 1;
                }
                deeps[dirs[i].id] = deeps[dirs[i].parent_id] + 1;
            }

        return dispatch({type: "SET_DEEPS", payload: deeps});
    }
    // @ts-ignore
    useEffect(() => {
        axios.get ("http://localhost:3050/rooms")
            .then((response) => response.data.dir)
            .then((dirs) => {dispatch({type: "LOAD_DIRS", payload: dirs}); return dirs})
            .then((dirs) => setDeeps(dirs));
    }, [])
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
    console.log(state);
    return (
        <Context.Provider value={{visibilityToggle}}>
        <>
            <ul>
                {state.dirs.map((item: IDirectory, i: number) => <Directory key={i} {...item} deep={state.deeps[item.id]}/>)}
            </ul>

        </>
        </Context.Provider>
    );
};

export default Manager;
