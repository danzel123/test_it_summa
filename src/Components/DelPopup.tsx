import React, {useContext, useEffect, useState} from "react";
import {Context} from "../context";

interface IId {
    id: string;
}

const DelPopup = ({id}: IId) => {
    const {closePopup, delDir} = useContext(Context);
    return(
        <div>
            <h2>Удалить?</h2>
            <button onClick={() => {delDir(id); closePopup()}}>Да</button>
            <button onClick={() => closePopup()}>Нет</button>
        </div>
    );
};

export  default DelPopup;
