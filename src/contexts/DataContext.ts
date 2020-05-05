import { createContext } from "react";



const initialContext = {dirs: [],
    isLoading: true,
    deeps: {},
    banned: new Set(),
    childs: {},
    parents: {},
    popup: { isOpen: false, content: ""}};
const DataContext = createContext(initialContext);

export default DataContext;
