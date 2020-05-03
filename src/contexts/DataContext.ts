import { createContext } from "react";

const initialContext = {dirs: [],
    isLoading: true,
    deeps: {},
    banned: new Set(),
    popup: { isOpen: false, content: ""}};
const DataContext = createContext(initialContext);

export default DataContext;
