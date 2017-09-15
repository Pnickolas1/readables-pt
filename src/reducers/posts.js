import {
    GET_POSTS,
    GET_POSTS_ID,
    MAKE_POST,
    UPDATE_POST,
    REMOVE_POST
} from '../actions/actionType';

import initialState from './initialState';

export default function posts(state = initialState.posts, action){
    const {posts, post}  = action

    switch(action.type) {
        case GET_POSTS:
            return posts.filter(post => post.delete === false)

        case GET_POSTS_ID:
            return post
        
        case MAKE_POST:
            return state.concat(post)

        case UPDATE_POST:
            if (state.length > 1)
                return state.map(currentState => currentState.id === post.id ? post: currentState)
            else
                return [post]        
   
        case REMOVE_POST:
            return state.filter(currentPost => currentPost.id !== post)
   


        default: 
            return state
    }
}