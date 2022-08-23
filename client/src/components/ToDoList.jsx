import React, { useContext, useEffect } from 'react'
import ToDoFinder from '../apis/ToDoFinder';
import { ToDoContext } from '../context/ToDoContext';

const ToDoList = (props) => {

    const {toDos, setToDos} = useContext(ToDoContext);
    const {alreadyDones, setAlreadyDones} = useContext(ToDoContext);
    const {includeDones, setIncludeDones} = useContext(ToDoContext);
    const {completeToDo} = useContext(ToDoContext);

    useEffect(() => {
        async function fetchData() 
        {
            try
            {
                const toDoList = await ToDoFinder.get("/notdone/done");
                setToDos(toDoList.data.data.todos);

                if (includeDones == true)
                {
                    const doneList = await ToDoFinder.get("/done");
                    setAlreadyDones(doneList.data.data.todos);
                }

        
            }
            catch (error)
            {
                console.log(error);
            }
        };
        
        fetchData();
    }, []);

    const handleDelete = async (e, id) => {
        e.stopPropagation();

        try
        {
            const response = await ToDoFinder.delete(`/${id}`);
            
            setToDos(toDos.filter(todo => {
                return (todo.id !== id)
            }))

            setAlreadyDones(alreadyDones.filter(todo => {
                return (todo.id !== id)
            }))
        }
        catch (error)
        {
            console.log(error);

        }
    };

    const handleCompleteItem = async (e, id) => {
        //e.stopPropagation();
        
        try
        {
            const response = await ToDoFinder.put(`/done/${id}`);
            
            completeToDo(response.data.data.todo);
            console.log(includeDones);
            setToDos(toDos.filter(todo => {
                return (todo.id !== id)
            }))
            

        }
        catch (error)
        {
            console.log(error);
        }

    };

    const handleChange = async () => {
        setIncludeDones(!includeDones);
        if (includeDones === true)
        {
            setAlreadyDones([]);
        }
        else {
            const doneList = await ToDoFinder.get("/done");
            setAlreadyDones(doneList.data.data.todos);
        }
      };

    return (
    
        <div className = "list-group">
            <label>
                <input
                    type = "checkbox"
                    checked = {includeDones}
                    onChange = {() => handleChange()}
                />Include Completed Items?
            </label>
            <table className = "table table-hover text-white border border-4">
                <thead>
                    <tr className = "bg-info">
                        <th scope="col">Content</th>
                        <th scope="col">Category</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody className = "table-dark">
                    {toDos && toDos.map((toDo) => {
                        return (
                        <tr onClick = {(e) => handleCompleteItem(e, toDo.id)} key = {toDo.id}>
                            <td>{toDo.content}</td>
                            <td>{toDo.category}</td>
                            <td><button className="btn btn-warning">Update</button></td>
                            <td><button onClick = {(e) => handleDelete(e, toDo.id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                        )
                    })}
                </tbody>
                <tbody className = "table-dark">
                    {alreadyDones && alreadyDones.map((toDo) => {
                        return (
                        <tr>
                            <td><del>{toDo.content}</del></td>
                            <td><del>{toDo.category}</del></td>
                            <td><button className="btn btn-warning"><del>Update</del></button></td>
                            <td><button onClick = {(e) => handleDelete(e, toDo.id)} className="btn btn-danger"><del>Delete</del></button></td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div> 
  )
}

export default ToDoList