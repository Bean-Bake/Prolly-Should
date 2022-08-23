import React, { createContext, useState } from 'react'

export const ToDoContext = createContext();

export const ToDoContextProvider = (props) => {

    const [toDos, setToDos] = useState([]);

    const [alreadyDones, setAlreadyDones] = useState([]);
    const [includeDones, setIncludeDones] = useState(true);

    const addToDos = (todo) => {
        setToDos([...toDos, todo]);
    };

    const completeToDo = (todo) => {
        setAlreadyDones([...alreadyDones, todo]);
    };

    return (
        <ToDoContext.Provider value = {{toDos, setToDos, addToDos, alreadyDones, setAlreadyDones, includeDones, setIncludeDones, completeToDo}}>
            {props.children}
        </ToDoContext.Provider>
    );

};
