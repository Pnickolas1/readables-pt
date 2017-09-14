import { GET_CATEGORIES } from '../actions/categories';
import initialState from './initialState';

export default function categories(state = initialState.categories, action){
    switch(action.type){
        case GET_CATEGORIES:
            return action.categories
        default:
            return state
    }
}