import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { Categories, CategoryState, TodosSelector, ToDoState } from '../atoms'
import CreateToDo from './CreateToDo'
import ToDo from './ToDo'

const Container = styled.div`
    max-width: 480px;
    margin: 0 auto;
    padding: 0 20px;
`

const Header = styled.header`
    height: 10vh;
    display: flex;
    padding: 20px;
    justify-content: center;
    align-items: center;
`

const Title = styled.div`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`

// 1. todo list state에 추가
// 2. 카테고리 분류
// 3. 카테고리 변경
// 4. 삭제
// 5. localStorage persistent

function ToDoList () {
    const setToDos = useSetRecoilState(ToDoState)
    useEffect(() => {
        const todoData = localStorage.getItem('toDos')
        console.log(todoData)
        if ( todoData !== null) {
            const toDos = JSON.parse(todoData)
            setToDos(toDos)
        }
    }, [])
    const toDos = useRecoilValue(TodosSelector)
    const setCategory = useSetRecoilState(CategoryState)
    const changeCategory = (event:React.FormEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event
        setCategory(value as any)
    }
    return (
        <Container>
            <Header>
                <Title>Todo List</Title>
            </Header>
            <select onInput={changeCategory}>
                <option value={Categories.TODO}>TODO</option>
                <option value={Categories.DOING}>DOING</option>
                <option value={Categories.DONE}>DONE</option>
            </select>
            <CreateToDo />
            { toDos.map(todo => (
                <ToDo key={todo.id} {...todo}/>
            ))}
        </Container>
    )
}

export default ToDoList