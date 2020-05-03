import React, {FC, useContext, useEffect, useState} from "react";
import {closePopUp, delDir} from "../actions/actions";
import DirectoryContext from "../contexts/DirectoryContext";

interface IDelPopUp {
    id: string;
}

const DelPopup: React.FC<IDelPopUp> = ({id}) => {
    const direcoryState = useContext(DirectoryContext);
    const dispatch = direcoryState!.dispatch;
    const state = direcoryState!.state;
    console.log(state)
    return(
        <div>
            <h2>Удалить?</h2>
            <button onClick={() => {delDir(dispatch, id); closePopUp(dispatch)}}>Да</button>
            <button onClick={() => closePopUp(dispatch)}>Нет</button>
        </div>
    );
};

export  default DelPopup;
