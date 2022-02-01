import React from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import styled from "styled-components"
import { CategoryArrayState, IToDo, ToDoState } from "../atoms"

const Text = styled.span`
    margin-right: 10px;
    font-size: 18px;
`

const Button = styled.button`
    width: 75px;
    border-radius: 10px;
    margin-right: 3px;
    background-color: ${props => props.color || '#273c75'};
    &:hover {
        background-color: ${props => props.color || '#273c75'};
        opacity: 0.7;
    }
`

function ToDo({text, id, category}:IToDo) {
    const setTodos = useSetRecoilState(ToDoState)
    const categories = useRecoilValue(CategoryArrayState)
    const changeCategory = (event:React.FormEvent<HTMLButtonElement>) => {
        const {currentTarget: {name}} = event
        
        setTodos(oldToDos => {
            const currentTargetIndex = oldToDos.findIndex(todo => todo.id === id)
            const newToDo = {text: text, id: id, category: name as any}
            const newToDos = [...oldToDos.slice(0, currentTargetIndex), newToDo, ...oldToDos.slice(currentTargetIndex+1)]

            localStorage.setItem('toDos', JSON.stringify(newToDos))

            return newToDos
        })
    }

    const deleteToDo = () => {
        setTodos(oldToDos => {
            const currentTargetIndex = oldToDos.findIndex(todo => todo.id === id)
            const newToDos = [...oldToDos.slice(0, currentTargetIndex), ...oldToDos.slice(currentTargetIndex+1)]

            localStorage.setItem('toDos', JSON.stringify(newToDos))
            return newToDos
        })
    }

    return (
        <div>
            <li>
                <Text>{text}</Text>
                {categories.map(cat => (
                    category !== cat && <Button onClick={changeCategory} name={cat} key={cat}>{cat}</Button>
                ))}
                <Button color="grey" onClick={deleteToDo}>DELETE</Button>
            </li>
        </div>
    )
}

export default ToDo