import { atom, selector } from 'recoil'

export enum Categories {
    "TODO" = "TODO",
    "DOING" = "DOING",
    "DONE" = "DONE"
}

export interface IToDo {
    text: string;
    id: number;
    category: Categories;
}

export const ToDoState = atom<IToDo[]>({
    key: 'toDos',
    default: []
})

export const CategoryState = atom<Categories>({
    key: 'category',
    default: Categories.TODO
})

export const TodosSelector = selector({
    key: 'todoSelector',
    get: ({get}) => {
        const category = get(CategoryState)
        const toDos = get(ToDoState)
        
        return toDos.filter(toDo => toDo.category === category)
    }
})