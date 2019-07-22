import {INCREMENT,DECREMENT} from './action-types'

export const increment=(number)=>({type:INCREMENT,number})
export const decrement=(number)=>({type:DECREMENT,number})

export function incrementAsync(number){
    return dispatch=>{
        setTimeout(()=>{
            dispatch(increment(number))
        },1000)
    }
}