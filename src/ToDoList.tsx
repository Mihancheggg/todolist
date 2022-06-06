import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type ToDoListPropsType = {
    title: string;
    tasks: Array<TaskType>; //или TaskType[]
    removeTask: (taskID: string) => void;
    changeToDoListFilter: (filter: FilterValuesType) => void;
    addTask: (title: string) => void;
}

export const ToDoList = (props: ToDoListPropsType) => {

    const [title, setTitle] = useState<string>('')

    const TodoListItem = props.tasks.map((task) => {
        const removeTask = () => props.removeTask(task.id)
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const getOnClickHandler = (filter: FilterValuesType) => {
        return () => props.changeToDoListFilter(filter)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyDownElement = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder="New element"
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownElement}
                />
                {/*e.currentTarget -> input*/}
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {TodoListItem}
            </ul>
            <div>
                <button onClick={getOnClickHandler('all')}>All</button>
                <button onClick={getOnClickHandler('active')}>Active</button>
                <button onClick={getOnClickHandler('completed')}>Completed</button>
            </div>
        </div>
    );
};