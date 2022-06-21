import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistsType = {
    id: string;
    title: string;
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
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

    // let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    //     {id: v1(), title: 'What to learn', filter: 'all'},
    //     {id: v1(), title: 'What to buy', filter: 'all'},
    // ])
    //
    //
    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: 'HTML&CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'ReactJS', isDone: false},
    //     {id: v1(), title: 'Rest API', isDone: false},
    //     {id: v1(), title: 'GraphQL', isDone: false},
    // ]);

    //let [filter, setFilter] = useState<FilterValuesType>('all');


    function removeTask(todolistID: string, taskID: string) {
        let filteredTasks = tasks[todolistID].filter(t => t.id !== taskID);
        setTasks({...tasks, [todolistID]: filteredTasks});
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists([...todolists.filter(item=>item.id !== todolistID) ])
        delete (tasks[todolistID])
    }

    function addTask(todolistID: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = {...tasks, [todolistID]: [task, ...tasks[todolistID]]};
        setTasks(newTasks);
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        // let task = tasks[todolistID].find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //setTasks([...tasks])

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
                    let tasksForTodolist = tasks[item.id];
                    if (item.filter === 'active') {
                        tasksForTodolist = tasks[item.id].filter(t => !t.isDone);
                    }
                    if (item.filter === 'completed') {
                        tasksForTodolist = tasks[item.id].filter(t => t.isDone);
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
