import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ToDoContextProvider } from './context/ToDoContext';
import NeedToDo from "./routes/NeedToDo";
import NotHome from './routes/Not Home';

const App = () => 
{
    return (
        <ToDoContextProvider>
            <div className = "container max-width">
                <Router>
                    <Routes>
                        <Route exact path="/" element={<NeedToDo/>}/>
                        <Route exact path="/Not" element={<NotHome/>}/>
                    </Routes>
                </Router>
            </div>
        </ToDoContextProvider>
    )
};

export default App;