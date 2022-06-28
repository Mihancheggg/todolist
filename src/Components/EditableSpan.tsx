import React, {ChangeEvent, useState} from 'react';

export type EditableSpanPropsType = {
    title: string
    callback: (newTitle: string)=> void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)

    const changeEditHandler = () => {
        setEdit(!edit)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        addTask()
    }

    const addTask = () => {
            props.callback(newTitle);
            //setTitle('');
    }



    return (
        edit ?
            <input autoFocus={true} onBlur={changeEditHandler} value={newTitle} onChange={onChangeHandler}/>:
            <span onDoubleClick={changeEditHandler}>{props.title}</span>

    );
};
