import { atom, selector } from 'recoil'

export const minuteState = atom({
    key: 'minutes',
    default: 111
})

export const hourSelector = selector<number>({
    key: 'hours',
    get: ({get}) => {
        const minute = get(minuteState)
        
        return minute / 60
    },
    set: ({set}, newValue) => {
        const minutes = Number(newValue) * 60
        set(minuteState, minutes)
    }
    
})