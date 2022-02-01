import { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { CategoryArrayState, CategoryState, TodosSelector, ToDoState } from '../atoms'
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
    const [categories, setCategories] = useRecoilState(CategoryArrayState)
    useEffect(() => {
        const todoData = localStorage.getItem('toDos')
        if ( todoData !== null) {
            const toDos = JSON.parse(todoData)
            setToDos(toDos)
        }
        const catData = localStorage.getItem('category')
        if (catData !== null) {
            const category = JSON.parse(catData)
            setCategories(category)
        }
    }, [])
    const toDos = useRecoilValue(TodosSelector)
    const setCategory = useSetRecoilState(CategoryState)
    const changeCategory = (event:React.FormEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event
        setCategory(value)
    }
    return (
        <Container>
            <Header>
                <Title>Todo List</Title>
            </Header>
            <select onInput={changeCategory}>
                {categories.map(cat => (
                    <option value={cat} key={cat}>{cat}</option>
                ))}
            </select>
            <CreateToDo />
            { toDos.map(todo => (
                <ToDo key={todo.id} {...todo}/>
            ))}
        </Container>
    )
}

export default ToDoList