import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';
import {addTaskActionCreator, removeTaskActionCreator, TasksReducer} from './Reducers/TasksReducer';
import {changeFilterActionCreator, FilterReducer} from './Reducers/FilterReducer';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, dispatchTasks] = useReducer(TasksReducer, [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);

    function removeTask(id: string) {
        dispatchTasks(removeTaskActionCreator(id))
        /*let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);*/
    }

    function addTask(title: string) {
        dispatchTasks(addTaskActionCreator(title))
        /*let task = { id: v1(), title: title, isDone: false };
        let newTasks = [task, ...tasks];
        setTasks(newTasks);*/
    }

    let [filter, dispatchFilter] = useReducer(FilterReducer, "all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        dispatchFilter(changeFilterActionCreator(value))
    }



    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask} />
        </div>
    );
}

export default App;
