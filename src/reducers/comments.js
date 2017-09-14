import {
    GET_ALL_COMMENTS,
    MAKE_COMMENT,
    UPDATE_COMMENT,
    REMOVE_COMMENT,
} from '../actions/actionType';
import initialState from './initialState';

export default function comments(state = initialState.comments, action) {
    const { comment, comments } = action

    switch (action.type) {

        case GET_ALL_COMMENTS:
            return comments
        
        case MAKE_COMMENT:
            return [
                ...state,
                Object.assign({}, comment )
            ]


        case UPDATE_COMMENT:
            return state.map(currentComment =>{
                if(currentComment.id === comment.id){
                    return comment
                }
                return currentComment
            })

        case REMOVE_COMMENT:
            return state.filter(currentComment => currentComment.id !== comment)

        default: 
            return state
    }
}