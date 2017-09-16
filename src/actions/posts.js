import * as api from '../utils/api';

export const GET_POSTS = 'GET_POSTS';
export const GET_POST_REF_ID = 'GET_POST_REF_ID';
export const MAKE_POST = 'MAKE_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const PLUS_VOTE = 'PLUS_VOTE';
export const MINUS_VOTE = 'MINUS_VOTE'

// post action creators
export function loadAllPosts(){
    return function (dispatch){
        return api.getAllPosts().then(response =>{
            if(response){
                dispatch(fetchPosts(response.data))
            }
        })
    }
}

export function loadPostRefId(postid){
    return function (dispatch){
        return api.getPostRefID(postid).then(response => {
            if(response){
                dispatch(getPostByID(response.data))
            }
        })
    }
}

export function loadPostsByCategory(category){
    return function (dispatch){
        return api.getPostbyCategory(category).then(response =>{
            if(response){
                dispatch(fetchPosts(response.data))
            }
        })
    }
}

export function editPost(post){
    return function(dispatch){
        return api.updatePost(post).then(response => {
            if(response){
                dispatch(updatePost(response))
            }
        })
    }
}

export function deletePost(post){
    return function (dispatch) {
        return api.removePost(post).then(response => {
            if(response){
                dispatch(removePost(response))
            }
        })
    }
}

export function addPostVote(postid){
    return function (dispatch){
        return api.plusPostVote(postid).then(response => {
            if(response){
                dispatch(updatePost(postid))
            }
        })
    }
}


export function minusPostVote(postid){
    return function (dispatch){
        return api.minusPostVote(postid).then(response => {
            if(response){
                dispatch(updatePost(postid))
            }
        })
    }
}

export function makePost(post){
    return function (dispatch){
        return api.writePost(post).then(response =>{
            if(response){
                dispatch(createPost(post))
            }
        })
    }
}

// posts actions

export function fetchPosts(posts){
    return {
        type: GET_POSTS,
        posts: posts.filter(post => post.deleted !== false)
    }
}

export function getPostByID(post){
    return {
        type: GET_POST_REF_ID,
        post: [post]
    }
}

export function createPost(post){
    return {
        type: MAKE_POST,
        post: post
    }
}

export function updatePost(post){
    return {
        type: UPDATE_POST,
        post: post.data
    }
}

export function removePost(post){
    return {
        type: REMOVE_POST,
        post: post
    }
}
