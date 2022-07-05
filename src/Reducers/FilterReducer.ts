import {FilterValuesType} from '../App';

export const FilterReducer = (state: FilterValuesType, action: ChangeFilterActionCreatorType) => {
    switch (action.type){
        case 'CHANGE-FILTER':{
            return action.payload.value
        }
        default: return state
    }
};

type ChangeFilterActionCreatorType = ReturnType<typeof changeFilterActionCreator>

export const changeFilterActionCreator=(value: FilterValuesType)=> {
    return{
        type: 'CHANGE-FILTER',
        payload: {
            value: value
        }
    } as const
}