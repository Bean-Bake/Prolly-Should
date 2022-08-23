import React from 'react'
import NotDoStopwatch from './NotDoTracker'

const NotDoList = () => {
  
    return (
        <div className = "list-group">
            <table className = "table table-hover text-white border border-4">
                <thead>
                    <tr className = "bg-info">
                        <th scope="col">Habit</th>
                        <th scope="col">Start/Reset</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
               {/*  <tbody className = "table-dark">
                    {toDos && toDos.map((toDo) => {
                        return (
                        <tr>
                            <td>{toDo.content}</td>
                            <td>{toDo.category}</td>
                            <td><button className="btn btn-warning">Update</button></td>
                            <td><button onClick = {(e) => handleDelete(e, toDo.id)} className="btn btn-danger">Delete</button></td>
                            <td><button className="btn btn-success">Done!</button></td>
                        </tr>
                        )
                    })}
                </tbody> */}
            </table>
        </div> 
  )
}

export default NotDoList