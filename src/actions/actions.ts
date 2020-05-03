import axios from "axios";
import React from "react";
import {IDirectory, IState} from "../types";

export type ActionType =
    | {type: "LOAD_DIRS", payload: IDirectory[]}
    | {type: "SET_BANNED", payload: Set<string>}
    | {type: "SET_LOADING", payload: boolean}
    | {type: "SET_DEEPS", payload: {[key: string]: number}}
    | {type: "DEL_DIR", payload: string}
    | {type: "CLOSE_POPUP"}
    | {type: "ADD_DIR", payload: IDirectory}
    | {type: "SHOW_POPUP", payload: React.ReactNode};

export const loadData = (dispatch: React.Dispatch<ActionType>) => {
    function setVisibility(dirs: IDirectory[]) {
        const newDir: IDirectory[] = dirs;
        for (let i = 0; i < newDir.length; i++) {
            newDir[i].visibility = true;
        }
        return newDir;
    }
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
    axios.get (`${process.env.REACT_APP_API_HOST}/dir`)
        .then((response) => response.data.dir)
        .then((res) => setVisibility(res))
        .then((dirs) => {dispatch({type: "LOAD_DIRS", payload: dirs}); return dirs; })
        .then((dirs) => setDeeps(dirs));
};

export const visibilityDir = (dispatch: React.Dispatch<ActionType>, id: string, state: any) => {
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

export const delDir = (dispatch: React.Dispatch<ActionType>, id: string) => {
    axios.delete(`${process.env.REACT_APP_API_HOST}/dir/${id}`, {})
        .then(() => loadData(dispatch));
};

export const closePopUp = (dispatch: React.Dispatch<ActionType>) => {
    dispatch({type: "CLOSE_POPUP"});
};

export const showPopUp = (dispatch: React.Dispatch<ActionType>, content: React.ReactNode) => {
    dispatch({type: "SHOW_POPUP", payload: content});
};

export const addPopUp = (dispatch: React.Dispatch<ActionType>, dir: IDirectory) => {
    console.log("до сжда");
    axios.post(`${process.env.REACT_APP_API_HOST}/dir`, dir).then((res) => loadData(dispatch));
    dispatch({type: "ADD_DIR", payload: dir});
};
