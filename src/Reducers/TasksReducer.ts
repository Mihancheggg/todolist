import {TaskType} from '../Todolist';
import {v1} from 'uuid';

export const TasksReducer = (state: Array<TaskType>, action: ActionCreatorsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return state.filter(item=> item.id !== action.payload.id)
        }
        case 'ADD-TASK': {
            let task = { id: v1(), title: action.payload.title, isDone: false };
            return [task, ...state]
        }
        default: {
            return state
        }
    }
};

type ActionCreatorsType = RemoveTaskActionCreatorType | AddTaskActionCreatorType

type AddTaskActionCreatorType = ReturnType<typeof addTaskActionCreator>
type RemoveTaskActionCreatorType = ReturnType<typeof removeTaskActionCreator>

export const removeTaskActionCreator = (id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id: id
        }
    } as const
};

export const addTaskActionCreator = (title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title: title
        }
    } as const
}