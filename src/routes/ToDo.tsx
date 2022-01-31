import React from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import styled from "styled-components"
import { Categories, IToDo, ToDoState } from "../atoms"

const Text = styled.span`
    margin-right: 10px;
    font-size: 18px;
`

const Button = styled.button`
    width: 75px;
    border-radius: 10px;
    margin-right: 3px;
    background-color: ${props => props.color || 'black'};
    &:hover {
        background-color: ${props => props.color};
        opacity: 0.5;
    }
`

function ToDo({text, id, category}:IToDo) {
    const setTodos = useSetRecoilState(ToDoState)
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
                {category !== Categories.TODO && <Button color="yellow" onClick={changeCategory} name="TODO">TODO</Button>}
                {category !== Categories.DOING && <Button color="blue" onClick={changeCategory} name="DOING">DOING</Button>}
                {category !== Categories.DONE && <Button color="green" onClick={changeCategory} name="DONE">DONE</Button>}
                <Button color="grey" onClick={deleteToDo}>DELETE</Button>
            </li>
        </div>
    )
}

export default ToDo