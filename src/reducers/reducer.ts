import {ActionType} from "../actions/actions";
import {IDirectory, IState} from "../types";

export default (state: IState, action: ActionType) => {
  switch (action.type) {
    case "LOAD_DIRS": {
      return {...state,
      dirs: action.payload.dirs, isLoading: false,
        deeps: action.payload.deeps,
        parents: action.payload.parents};

    }
    case "SET_BANNED": {

        return {...state,
          banned: action.payload};

      }
    case "SET_LOADING":
      return {...state,
        isLoading: action.payload};
    case "CLOSE_POPUP": {
      return {...state,
      popup: {isOpen: false, content: ""}};
    }
    case "SHOW_POPUP": {
      return {...state,
        popup: {isOpen: true, content: action.payload}};
    }
    case "ADD_DIR": {
      return {...state};
    }
    default:
      return state;
  }
};
