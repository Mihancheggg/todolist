import React from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";

//CRUD: create, read, update, delete

function App() {

    //BLL: business logic layer
    const Tasks1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]
    const Tasks2: Array<TaskType> = [
        {id: 4, title: "Meat", isDone: true},
        {id: 5, title: "Fish", isDone: false},
        {id: 6, title: "Milk", isDone: false},
       /* {id: 7, title: "Honey", isDone: false},*/
    ]

    //UI: user interface
    return (
        <div className="App">
            <ToDoList title={"What to do"} tasks={Tasks1}/>
            <ToDoList title={"What to buy"} tasks={Tasks2}/>
            {/*<ToDoList title={"What to learn"}/>
            <ToDoList title={"What to read"}/>*/}
            {/*<div>
                <h3>What to learn</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    <li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>
                    <li><input type="checkbox" checked={true}/> <span>JS</span></li>
                    <li><input type="checkbox" checked={false}/> <span>React</span></li>
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>*/}
        </div>
    );
}

export default App;
