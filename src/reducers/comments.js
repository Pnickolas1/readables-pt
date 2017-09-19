import {
    GET_ALL_COMMENTS,
    MAKE_COMMENT,
    UPDATE_COMMENT,
    REMOVE_COMMENT,
} from '../actions/actionType';
import initialState from './initialState';

export default function comments(state = initialState.comments, action) {
    const { comment, comments, postid } = action

    switch (action.type) {

        case GET_ALL_COMMENTS:
            return{
                ...state,
                [postid]: comments
            }
        
        case MAKE_COMMENT:
            return {
                ...state,
                [postid]: state[postid].concat(comment)
            }


        case UPDATE_COMMENT:
            let newComments = state[postid].filter(oldComments => oldComments.id !== comment.id)
                newComments.push(comment)
                return{
                    [postid]: newComments
                }

        case REMOVE_COMMENT:
            return {
                [postid] : state[postid].filter(currentComment => currentComment.id !== comment)
            }

        default: 
            return state
    }
}