import React, {FC, useContext, useEffect, useState} from "react";
import {closePopUp, delDir} from "../actions/actions";
import DirectoryContext from "../contexts/DirectoryContext";

interface IDelPopUp {
    id: string;
    name: string
}

const DelPopup: React.FC<IDelPopUp> = ({id, name}) => {
    const direcoryState = useContext(DirectoryContext);
    const dispatch = direcoryState!.dispatch;
    const state = direcoryState!.state;
    return(
        <div className={'del-popup'}>
            <h2>Удалить?</h2>
            <p>Папка {name} будет удалена</p>
            <div className={'buttons-group'}>
                <button onClick={() => {delDir(dispatch, id); closePopUp(dispatch)}}>Да</button>
                <button onClick={() => closePopUp(dispatch)}>Нет</button>
            </div>
        </div>
    );
};

export  default DelPopup;
