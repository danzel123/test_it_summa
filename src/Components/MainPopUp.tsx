import React, {useContext} from "react";
import {Context} from "../context";
import DirectoryContext from "../contexts/DirectoryContext";
import {IDirectoryProps} from "../types";

const MainPopUp: React.FC = () => {
    const direcoryState = useContext(DirectoryContext);
    const dispatch = direcoryState!.dispatch;
    const state = direcoryState!.state;
    return(
        <div className={"PopUp"}>
            {state.popup.content}
        </div>
   );
};

export default MainPopUp;
