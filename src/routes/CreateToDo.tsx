import { useForm } from "react-hook-form"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import styled from 'styled-components'
import {CategoryArrayState, CategoryState, ToDoState } from "../atoms"

const Error = styled.div`
    color: red;
    padding: 5px 0px;
`

const Category = styled.input`
    margin: 10px 0px;
`

const ToDo = styled.input`
    
`

interface IForm {
    toDo: string;
    category?: string;
}

function CreateToDo () {
    const {register, handleSubmit, setValue, getValues, formState: { errors }} = useForm<IForm>()
    const category = useRecoilValue(CategoryState)
    const setCategory = useSetRecoilState(CategoryArrayState)
    const setToDos = useSetRecoilState(ToDoState)
    
    const onValid = ({toDo}: IForm) => {
        setValue("toDo", "")

        setToDos(oldArray => {
            const newArray = [{text: toDo, id: Date.now(), category: category}, ...oldArray]
            localStorage.setItem('toDos', JSON.stringify(newArray))
            return newArray
        })
    }

    const addCat = () => {
        const { category } = getValues()
        if (category === "" || category === undefined) {
            return
        }
        setCategory(oldArray => {
            const newArray = [...oldArray, category]
            localStorage.setItem('category', JSON.stringify(newArray))
            return [
                ...oldArray,
                category
            ]
        })
        setValue("category", "")
    }
    
    return (
        <div>
            <Category {...register("category")} placeholder="write custom category!"/>
            <button onClick={addCat}>Add Category</button>
            <form onSubmit={handleSubmit(onValid)}>
                <ToDo {...register("toDo", { required: "todo is required" })} placeholder="write to do!" />
                <button>Add</button> <br/>
                <Error>{errors?.toDo?.message}</Error>
            </form>
        </div>
    )
}

export default CreateToDo