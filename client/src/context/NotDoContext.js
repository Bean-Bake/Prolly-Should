import React, { createContext, useState } from 'react'

export const NotDoContext = createContext();

export const NotDoContextProvider = (props) => {

    const [NotDos, setNotDos] = useState([]);

    const addNotDos = (NotDo) => {
        setNotDos([...NotDos, NotDo]);
    };

    return (
        <NotDoContext.Provider value = {{NotDos, setNotDos, addNotDos}}>
            {props.children}
        </NotDoContext.Provider>
    );

};
