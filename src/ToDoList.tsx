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
    filter: FilterValuesType;
    removeTask: (taskID: string) => void;
    changeToDoListFilter: (filter: FilterValuesType) => void;
    addTask: (title: string) => void;
    changeTaskStatus: (taskID: string, isDone: boolean) => void;
}

export const ToDoList = (props: ToDoListPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const TodoListItem = props.tasks.length ? props.tasks.map((task) => {
        const removeTask = () => props.removeTask(task.id)
        return (
            <li key={task.id}>
                <input type="checkbox"
                       checked={task.isDone}
                       onChange={(event) => props.changeTaskStatus(task.id, event.currentTarget.checked)}/>
                <span className={task.isDone ? 'isDone' : ''}>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    }): <span>Your task list is empty!</span>

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const getOnClickHandler = (filter: FilterValuesType) => {
        return () => props.changeToDoListFilter(filter)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        error && setError(false)
    }
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
                    className={error ? 'error' : ''}
                />
                {/*e.currentTarget -> input*/}
                <button onClick={addTask}>+</button>
                {error && <div style={{color: 'red'}}>Title is required!</div>}
            </div>
            <ul>
                {TodoListItem}
            </ul>
            <div>
                <button
                    onClick={getOnClickHandler('all')}
                    className={props.filter === 'all' ? 'active' : ''}>All
                </button>
                <button onClick={getOnClickHandler('active')}
                        className={props.filter === 'active' ? 'active' : ''}>Active
                </button>
                <button onClick={getOnClickHandler('completed')}
                        className={props.filter === 'completed' ? 'active' : ''}>Completed
                </button>
            </div>
        </div>
    );
};