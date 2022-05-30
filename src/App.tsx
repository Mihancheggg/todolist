import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from "./ToDoList";

//CRUD: create, read, update, delete

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    //BLL: business logic layer

    // let Tasks1: Array<TaskType> = [
    //     {id: 1, title: "HTML&CSS", isDone: true},
    //     {id: 2, title: "JS", isDone: true},
    //     {id: 3, title: "React", isDone: false},
    // ]
    // const Tasks2: Array<TaskType> = [
    //     {id: 4, title: "Meat", isDone: true},
    //     {id: 5, title: "Fish", isDone: false},
    //     {id: 6, title: "Milk", isDone: false},
    //     {id: 7, title: "Honey", isDone: false},
    // ]

    const [Tasks1, setTasks1] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ])

    const removeTask = (taskID: number) => {
        const filteredTasks = Tasks1.filter(task => task.id !== taskID);
        setTasks1(filteredTasks);
    }

    const [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForRender = Tasks1
    if (filter === 'active'){
        tasksForRender = Tasks1.filter(item => item.isDone === false);
    }
    if (filter === 'completed'){
        tasksForRender = Tasks1.filter(item => item.isDone === true);
    }

    const changeToDoListFilter = (filter: FilterValuesType) => {
        setFilter(filter);
    }

    //UI: user interface
    return (
        <div className="App">

            <ToDoList title={"What to do"} tasks={tasksForRender} removeTask={removeTask} changeToDoListFilter={changeToDoListFilter}/>
            {/*<ToDoList title={"What to buy"} tasks={Tasks2}/>*/}

        </div>
    );
}

export default App;
