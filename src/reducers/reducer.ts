import axios from "axios";
import {IDirectory, IState} from "../types";

// @ts-ignore
export default (state: IState, action) => {
  switch (action.type) {
    case "LOAD_DIRS": {
      return {...state,
      dirs: action.payload, isLoading: false};

    }
    case "SET_BANNED": {

        return {...state,
          banned: action.payload};

      }
    case "SET_LOADING":
      return {...state,
        isLoading: action.payload};
    case "SET_DEEPS": {
          return {...state,
            deeps: action.payload};

        }
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
