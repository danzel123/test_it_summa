import axios from "axios";
import {IDirectory} from "./Components/Manager";
const initialState = {
  dirs: [],
  isLoading: true,
  deeps: {},
  banned: new Set(),
};

interface IState {
  dirs: IDirectory[];
  isLoading: boolean;
  deeps: any;
  banned: any;

}


// @ts-ignore
export default (state= initialState, action) => {
  switch (action.type) {
    case "LOAD_DIRS": {
      let newDir: IDirectory[] = [].concat(action.payload);
      for(let i = 0; i < newDir.length; i++){
        newDir[i].visibility = true;
      }
      return {...state,
      dirs: newDir, isLoading: false};

    }
    case "SET_BANNED": {
        return {...state,
          banned: action.payload};

      }
    case "SET_LOADING":
      return {...state,
        isLoading: action.payload};
    case "SET_DEEPS": {
      console.log('af')
          return {...state,
            deeps: action.payload};

        }
    default:
      return state;
  }
};
