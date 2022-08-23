import React, { useContext, useEffect, useState } from 'react'
import Stopwatch from './Stopwatch';

const NotDoTracker = () => {
  
  const [active, setActive] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    
    let interval = setInterval(() => {
      setTime((time) => time + 1000);
    }, 1000);
 
   })
  
    return (
    <Stopwatch time = {time}/>

    /*  <tbody className = "table-dark">
                    {toDos && toDos.map((toDo) => {
                        return (
                        <tr>
                            <td>{toDo.name}</td>
                            <td><button className="btn btn-warning">Start/Reset</button></td>
                            <td><button onClick = {(e) => handleDelete(e, toDo.id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                        )
                    })}
                </tbody> */
  )
}

export default NotDoTracker