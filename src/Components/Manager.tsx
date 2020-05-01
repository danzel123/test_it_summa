import groupBy from "lodash/groupBy";
import some from "lodash/some";
import React, {useEffect, useState} from "react";
import {Context} from "../context";
import Directory from "./Directory";

interface directoryInterface {
    id: string;
    name: string;
    parent_id: string;
    visibility?: boolean;
}

const Manager: React.FC = () => {
    const data: directoryInterface[] = {
        dir: [
            {
                id: "5e257721961a1",
                name: "root",
                parent_id: "null",
            },
            {
                id: "5e25774a63bf7",
                name: "app",
                parent_id: "5e257721961a1",
            },
            {
                id: "5e257770389a7",
                name: "src",
                parent_id: "5e25774a63bf7",
            },
            {
                id: "5e25779790362",
                name: "cache",
                parent_id: "5e25774a63bf7",
            },
            {
                id: "5e2577c14c477",
                name: "logs",
                parent_id: "5e257721961a1",
            },
            {
                id: "5e2577e0c3693",
                name: "2020-01-16",
                parent_id: "5e2577c14c477",
            },
            {
                id: "5e2577e700e97",
                name: "2020-01-17",
                parent_id: "5e2577c14c477",
            },
            {
                id: "5e257818aa716",
                name: "log 2",
                parent_id: "5e2577c14c477",
            },
            {
                id: "5e25772196112312",
                name: "123123",
                parent_id: "5e257818aa716",
            },
            {
                id: "5e25774a4121427",
                name: "44444",
                parent_id: "5e257818aa716",
            },
        ],
    }.dir;
    const[directory, setDirectory] = useState(data);
    const deeps =  {[data[0].id]: 0};
    for (let i: number = 1; i < data.length; i++) {
        if (Object.keys(deeps).indexOf(data[i].parent_id) !== -1) {
            deeps[data[i].id] =  deeps[data[i].parent_id] + 1;
        }
        deeps[data[i].id] = deeps[data[i].parent_id] + 1;
        data[i].visibility = true;
    }
    data[0].visibility = true;

    const emptyBan = new Set();
    // Состояние невдимых id. По нему вычисляю, какие предки должны стать видимыми
    const[banned, setBanned] = useState(emptyBan);
    useEffect(() => console.log(banned));
    const visibilityToggle = (id: string, parentId: string) => {
        const banedName = new Set(banned);
        console.log(banedName);
        const box = [];
        // Если индекс уже в невидимых, то делаю предков видимыми
        if (banedName.has(id)) {
            for (let i = 0; i < directory.length; i++) {
                box.push(directory[i]);
                if (id === directory[i].parent_id) {
                    box[i].visibility = true;
                }
            }
            // удаляю id предки которого стали видимы
            banedName.delete(id);
        } else {
            // добавляю id предки которого будет невидимы
            banedName.add(id);
            for (let i = 0; i < directory.length; i++) {
                box.push(directory[i]);
                if (banedName.has(directory[i].parent_id)) {
                    // если предок стал невидимый, то его добавляю в список родителей, предки которого будет невидимы
                    banedName.add(directory[i].id);
                    box[i].visibility = false;
                }
            }
        }
        setBanned(banedName);
        setDirectory(box);

    };
    return (
        <Context.Provider value={{visibilityToggle}}>
        <>
            <ul>
                {directory.map((item: any, i: number) => <Directory key={i} {...item} deep={deeps[item.id]}/>)}
            </ul>

        </>
        </Context.Provider>
    );
};

export default Manager;
