export interface IDirectory {
    id: string;
    name: string;
    parent_id: string;
    visibility?: boolean;
}

export interface IDirectoryProps {
    id: string;
    name: string;
    parent_id: string;
    deep: number;
    visibility?: boolean;
}

export interface IState {
    dirs: IDirectory[];
    isLoading: boolean;
    deeps: {[key: string]: number};
    banned: Set<string|unknown>;
    parents: {[key: string]: string[]};
    popup: {
        isOpen: boolean;
        content?: React.ReactNode;
    };
}

