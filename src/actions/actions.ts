import axios from "axios";
import React from "react";
import {IDirectory, IState} from "../types";
interface IPaylaodDirs {
    deeps: {[key: string]: number};
    parents: {[key: string]: string[]};
    dirs: IDirectory[];
}
export type ActionType =
    | {type: "LOAD_DIRS", payload: IPaylaodDirs}
    | {type: "SET_BANNED", payload: Set<string>}
    | {type: "SET_LOADING", payload: boolean}
    | {type: "DEL_DIR", payload: string}
    | {type: "CLOSE_POPUP"}
    | {type: "ADD_DIR", payload: IDirectory}
    | {type: "SHOW_POPUP", payload: React.ReactNode}
    | {type: "PATCH_DIR", payload: React.ReactNode};

// Загрузка директорий
export const loadData = (dispatch: React.Dispatch<ActionType>) => {
    // устанавливает всем дир-ям видимость тру
    function setVisibility(dirs: IDirectory[]) {
        const newDir: IDirectory[] = dirs;
        for (let i = 0; i < newDir.length; i++) {
            newDir[i].visibility = true;
        }
        return newDir;
    }
    // Вычисление глубин директорий, возвращает массив глубин
    function setDeeps(dirs: IDirectory[]) {
        const deeps = {[dirs[0].id]: 0};
        for (let i: number = 1; i < dirs.length; i++) {
            if (Object.keys(deeps).indexOf(dirs[i].parent_id) !== -1) {
                deeps[dirs[i].id] = deeps[dirs[i].parent_id] + 1;
            }
            deeps[dirs[i].id] = deeps[dirs[i].parent_id] + 1;
        }
        return deeps;
    }
    // Выичиление детей родителей
    function setChilds(dirs: IDirectory[]) {
        const res: {[k: string]: string[]} = {};
        dirs.forEach((el) => {
            res[el.id] = [];
            dirs.forEach((child) => {
                if (el.id === child.parent_id) {
                    res[el.id].push(child.id);
                }
            });
        });
        console.log(res);
        return res;
    }
    // Загрузка ...
    axios.get (`${process.env.REACT_APP_API_HOST}/dir`)
        .then((response) => response.data.dir)
        .then((res) => setVisibility(res))
        .then((dirs) => {
            return {
                dirs,
                parents: setChilds(dirs),
                deeps: setDeeps(dirs),
            };
        })
        .then((res) => dispatch({type: "LOAD_DIRS", payload: res}));
};

// Вычисление предков, которых необходимо скрыть вместе с родителем
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

export const addDir = (dispatch: React.Dispatch<ActionType>, dir: IDirectory) => {
    axios.post(`${process.env.REACT_APP_API_HOST}/dir`, dir).then((res) => loadData(dispatch));
    dispatch({type: "ADD_DIR", payload: dir});
};

export const changeDir = (dispatch: React.Dispatch<ActionType>, dir: IDirectory) => {
    axios.patch(`${process.env.REACT_APP_API_HOST}/dir/${dir.id}`,
        {name: dir.name, parent_id: dir.parent_id}).then((res) => loadData(dispatch));
    dispatch({type: "PATCH_DIR", payload: dir});
};
