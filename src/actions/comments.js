import * as api from '../utils/api';

import { GET_ALL_COMMENTS, 
    MAKE_COMMENT, 
    UPDATE_COMMENT, 
    REMOVE_COMMENT } from './actionType'



// action creators 

export function loadComments(id){
    return function(dispatch){
        return api.getAllComments(id).then(response => {
            if(response){
                dispatch(getAllComments(id, response.data))
            }
        })
    }
}

export function plusComment(commentid){
    return function (dispatch) {
        return api.plusCommentVote(commentid).then(response => {
            if (response){
                return dispatch(updateComment(response.data))
            }
        })
    }
}


export function minusComment(commentid){
    return function (dispatch) {
        return api.minusCommentVote(commentid).then(response => {
            if(response){
                return dispatch(updateComment(response.data))
            }
        })
    }
}

export function makeNewComment(comment) {
    return function (dispatch) {
        return api.makeComment(comment).then(response => {
            if(response){
                dispatch(makeComment(response.data))
            }
        })
    }
}

export function removeAComment(commentid){
    return function (dispatch){
        return api.removeComment(commentid).then( response => {
            if(response){
                return dispatch(removeComment(response.data))
            }
        })
    }
}

export function editComment(commentid){
    return function(dispatch){
        return api.updateComment(commentid).then(response => {
            if (response){
                return dispatch(updateComment(response.data))
            }
        })
    }
}

// ALL COMMENT ACTIONS

export function getAllComments(id, comments) {
    return {
        type: GET_ALL_COMMENTS,
        comments: comments, 
        id: id
    }
}

export function makeComment(comment){
    return{
        type: MAKE_COMMENT,
        comment: comment,
        id: comment.parentId
    }
}

export function updateComment(comment){
    return {
        type: UPDATE_COMMENT,
        comment: comment,
        id: comment.parentId
    }
}

export function removeComment(comment){
    return {
        type: REMOVE_COMMENT,
        comment: comment,
        id: comment.parentid
    }
}



