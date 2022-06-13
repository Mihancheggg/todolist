import React, {useState} from 'react';
import './App.css';
import {TaskType, ToDoList} from './ToDoList';
import {v1} from 'uuid';

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
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskID: string) => {
        const filteredTasks = Tasks1.filter(task => task.id !== taskID);
        setTasks1(filteredTasks);
    }

    let tasksForRender = Tasks1
    if (filter === 'active') {
        tasksForRender = Tasks1.filter(item => !item.isDone);
    }
    if (filter === 'completed') {
        tasksForRender = Tasks1.filter(item => item.isDone);
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks1([newTask, ...Tasks1])
    }
    const changeToDoListFilter = (filter: FilterValuesType) => {
        setFilter(filter);
    }
    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        setTasks1(Tasks1.map(t => t.id === taskID ? {...t, isDone: isDone} : t))
    }

    //UI: user interface
    return (
        <div className="App">

            <ToDoList filter={filter} changeTaskStatus={changeTaskStatus} title={'What to do'} tasks={tasksForRender}
                      removeTask={removeTask} changeToDoListFilter={changeToDoListFilter} addTask={addTask}/>
            {/*<ToDoList title={"What to buy"} tasks={Tasks2}/>*/}

        </div>
    );
}

export default App;
