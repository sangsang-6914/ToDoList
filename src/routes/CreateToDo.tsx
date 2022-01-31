import { useForm } from "react-hook-form"
import { useRecoilValue, useSetRecoilState } from "recoil"
import styled from 'styled-components'
import {CategoryState, ToDoState } from "../atoms"

const Error = styled.div`
    color: red;
    padding: 5px 0px;
`

interface IForm {
    toDo: string;
}

function CreateToDo () {
    const {register, handleSubmit, setValue, formState: { errors }} = useForm<IForm>()
    const category = useRecoilValue(CategoryState)
    const setToDos = useSetRecoilState(ToDoState)
    
    const onValid = ({toDo}: IForm) => {
        setValue("toDo", "")

        setToDos(oldArray => {
            const newArray = [{text: toDo, id: Date.now(), category: category}, ...oldArray]
            localStorage.setItem('toDos', JSON.stringify(newArray))
            return newArray
        })

    }
    
    return (
        <div>
            <form onSubmit={handleSubmit(onValid)}>
                <input {...register("toDo", { required: "todo is required" })} />
                <button>Add</button> <br/>
                <Error>{errors?.toDo?.message}</Error>
            </form>
        </div>
    )
}

export default CreateToDo