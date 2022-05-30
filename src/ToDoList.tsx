import React from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

export type ToDoListPropsType = {
    title: string;
    tasks: Array<TaskType>; //или TaskType[]
    removeTask: (taskID: number) => void;
    changeToDoListFilter: (filter: FilterValuesType) => void;
}

export const ToDoList = (props: ToDoListPropsType) => {

    const TodoListItem = props.tasks.map((task) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input placeholder="New element"/>
                <button>+</button>
            </div>
            <ul>
                {TodoListItem}
            </ul>
            <div>
                <button onClick={() => props.changeToDoListFilter('all')}>All</button>
                <button onClick={() => props.changeToDoListFilter('active')}>Active</button>
                <button onClick={() => props.changeToDoListFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};