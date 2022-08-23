import React, { useState, useContext } from 'react'
import ToDoFinder from "../apis/ToDoFinder";
import { ToDoContext } from '../context/ToDoContext';

const AddToDo = () =>
{
    const {addToDos} = useContext(ToDoContext);
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Health");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (content != "" && category != "")
        {
            try 
            {
                const response = await ToDoFinder.post("/createtodo", {
                    content: content,
                    category: category
                });

                addToDos(response.data.data.todo);

                setContent("");
            }
            catch (error)
            {
                console.log(error);
            }
        }
        else
        {
            
        }
    };

    return (
        <div className = "mb-4">
            <form action = "">
                <div className="row">
                    <div className="col-lg-5">
                        <input 
                            value = {content}
                            onChange = {e => setContent(e.target.value)} 
                            type = "text" 
                            className = "form-control" 
                            placeholder = "Content"
                        />
                    </div>
                    <div className="col">
                        <select 
                            value = {category} 
                            onChange = {e => setCategory(e.target.value)} 
                            className = "custom-select my-2 mr-sm-2"
                        >
                            <option disabled>Category</option>
                            <option value = "Health">Health</option>
                            <option value = "Professional">Professional</option>
                            <option value = "Spiritual">Spiritual</option>
                        </select>
                    </div>
                    <button onClick = {handleSubmit} type = "submit" className = "col btn btn-primary">Add</button>
                    <div className = "col"/>
                    <div className = "col"/>
                </div>
            </form>
        </div>
    )
}

export default AddToDo