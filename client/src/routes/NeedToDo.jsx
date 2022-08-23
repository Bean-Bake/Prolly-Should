import React from 'react'
import AddToDo from '../components/AddToDoItem';
import ShouldHeader from "../components/ShouldHeader";
import ToDoList from '../components/ToDoList';

const NeedToDo = () =>
{
    return (
        <div>
            <ShouldHeader/>
            <AddToDo/>
            <ToDoList/>
        </div>
    )
}

export default NeedToDo