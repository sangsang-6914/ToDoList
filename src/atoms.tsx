import { atom, selector } from 'recoil'
export interface IToDo {
    text: string;
    id: number;
    category: string;
}

export const ToDoState = atom<IToDo[]>({
    key: 'toDos',
    default: []
})

export const CategoryArrayState = atom<string[]>({
    key: 'catArray',
    default: ["TODO", "DOING", "DONE"]
})

export const CategoryState = atom<string>({
    key: 'category',
    default: "TODO"
})

export const TodosSelector = selector({
    key: 'todoSelector',
    get: ({get}) => {
        const category = get(CategoryState)
        const toDos = get(ToDoState)
        
        return toDos.filter(toDo => toDo.category === category)
    }
})