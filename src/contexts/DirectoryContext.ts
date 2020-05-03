import { createContext } from "react";
import {ActionType} from "../actions/actions";
import {IState} from "../types";

export interface IDirectoryState {
    state: IState;
    dispatch: React.Dispatch<ActionType>;
}

const DirectoryContext = createContext<IDirectoryState | null>(null);

export default DirectoryContext;
