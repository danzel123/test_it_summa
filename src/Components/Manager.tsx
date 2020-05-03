import axios from "axios";
import React, {useContext, useEffect, useReducer, useState} from "react";
import {loadData} from "../actions/actions";
import DataContext from "../contexts/DataContext";
import DirectoryContext from "../contexts/DirectoryContext";
import reducer from "../reducers/reducer";
import {IDirectory} from "../types";
import DelPopup from "./DelPopup";
import Directory from "./Directory";
import MainPopUp from "./MainPopUp";

const Manager: React.FC = () => {
    const initialState = useContext(DataContext);
    const [ state, dispatch ] = useReducer(reducer, initialState);
    const [popup, setPopup] = useState({visible: false, id: ""});

    // @ts-ignore
    useEffect(() => {
        loadData(dispatch);
    }, []);
    return (
        <DirectoryContext.Provider value={{state, dispatch}}>
        <>{state.dirs.length ?
            <ul>
                {state.dirs.map((item: IDirectory, i: number) =>
                    <Directory  key={i} {...item} deep={state.deeps[item.id]}/>)}
            </ul>
            :
            null
        }
            {popup.visible ?
                <DelPopup id={popup.id}/>
                :
                null}
        {/*        DelPopUp ChangePopUp AddPopUp ErrorPopUp*/}
        <MainPopUp/>
        </>
        </DirectoryContext.Provider>
    );
};

export default Manager;
