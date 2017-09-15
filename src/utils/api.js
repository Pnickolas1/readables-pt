import axios from 'axios'

const API_URL = "http://localhost:3001"
const APP_HEADER = { headers: { 'Authorization': 'LateRoundPick48','Content-Type': 'application/json'}}


//  CATEGORIES

export function getAllCategories(){
    return axios.get( `${API_URL}/categories`, APP_HEADER)
}


// COMMENTS
export function getAllComments(postid){
    return axios.get(`${API_URL}/posts/${postid}/comments`, APP_HEADER)
}

export function makeComment(comment){
    return axios.post(`${API_URL}/comments`, comment, APP_HEADER)
}

export function updateComment(comment){
    return axios.put(`${API_URL}/comments/${comment.id}`, comment, APP_HEADER)
}

export function removeComment(comment){
    return axios.delete(`${API_URL}/comments/${comment.id}`, APP_HEADER)
}

export function plusCommentVote(commentid){
    return axios.post(`${API_URL}/comments/${commentid}`, {option: "plusVote"}, APP_HEADER)
}

export function minusCommentVote(commentid){
    return axios.post(`${API_URL}/comments/${commentid}`, {option: "minusVote"}, APP_HEADER)
}





//POSTS

export function getAllPosts(){
    return axios.get(`${API_URL}/posts`, APP_HEADER)
}

export function writePost(post){
    return axios.get(`${API_URL}/posts`,APP_HEADER)
}

export function updatePost(post){
    return axios.put(`${API_URL}/posts/${post.id}`,post, APP_HEADER)
}

export function getPostbyCategory(category){
    return axios.get(`${API_URL}/${category}/posts`, APP_HEADER)
}

export function getPostRefID(postid){
    return axios.get(`${API_URL}/posts/${postid}`, APP_HEADER)
}

export function plusPostVote(postid){
    return axios.post(`${API_URL}/posts/${postid}`,{option: "plusVote"}, APP_HEADER)
}

export function minusPostVote(postid){
    return axios.post(`${API_URL}/posts/${postid}`,{option: "minusVote"}, APP_HEADER )
}

export function removePost(postid){
    return axios.delete(`${API_URL}/posts/${postid}`,APP_HEADER)
}
