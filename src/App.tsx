import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsType = {
    id: string;
    title: string;
    filter: FilterValuesType
}

type TaskStateType = {
    [todolistID: string]: Array<TaskType>
}

function App() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });

    //let [filter, setFilter] = useState<FilterValuesType>('all');


    function removeTask(todolistID: string, taskID: string) {
        let filteredTasks = tasks[todolistID].filter(t => t.id !== taskID);
        setTasks({...tasks, [todolistID]: filteredTasks});
        // const newTasks = {...tasks}; newTasks[todolistID]= filteredTasks; setTasks(newTasks)
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists([...todolists.filter(item => item.id !== todolistID)])
        delete (tasks[todolistID])
    }

    function addTask(todolistID: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = {...tasks, [todolistID]: [task, ...tasks[todolistID]]};
        setTasks(newTasks);
        //newTasks ={...tasks}; newTasks[todolistID] = [task, ...tasks[todolistID]]}; setTasks(newTasks);
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {

        //way 1(mine) immutability???
        // let changedTasksArray = tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: isDone} : el)
        // setTasks({...tasks, [todolistID]: changedTasksArray})

        // way 2 (Victor)
        // let copyTasks = {...tasks};
        // copyTasks[todolistID] = tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: isDone} : el);
        // setTasks(copyTasks)

        //way 3 (Igor)
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: isDone} : el)
        });
    }


    //let tasksForTodolist = tasks;

    // if (filter === 'active') {
    //     tasksForTodolist = tasks.filter(t => t.isDone === false);
    // }
    // if (filter === 'completed') {
    //     tasksForTodolist = tasks.filter(t => t.isDone === true);
    // }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(item => item.id === todolistID ? {...item, filter: value} : item));
    }


    return (
        <div className="App">
            {todolists.map((item) => {

                    let tasksForTodolist;
                    if (item.filter === 'active') {
                        tasksForTodolist = tasks[item.id].filter(t => !t.isDone);
                    } else if (item.filter === 'completed') {
                        tasksForTodolist = tasks[item.id].filter(t => t.isDone);
                    } else {
                        tasksForTodolist = tasks[item.id];
                    }

                    return (<Todolist title={item.title}
                                      tasks={tasksForTodolist}
                                      removeTask={removeTask}
                                      changeFilter={changeFilter}
                                      addTask={addTask}
                                      changeTaskStatus={changeStatus}
                                      filter={item.filter}
                                      todolistID={item.id}
                                      key={item.id}
                                      removeTodolist={removeTodolist}
                    />)
                }
            )}
        </div>
    );
}

export default App;
