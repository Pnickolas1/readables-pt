import axios from 'axios'

const API_URL = "http://localhost:3001";
const API_HEADER = { headers: {
    'Authorization': 'LateRoundPick',
    'Content-Type': 'application/json'
    }}

// COMMENTS
export function getAllComments(postid){
    return axios.get(`${API_URL}/posts/${postid}/comments`, API_HEADER)
}

export function makeComment(comment){
    return axios.post(`${API_URL}/comments`, comment, API_HEADER)
}

export function updateComment(comment){
    return axios.put(`${API_URL}/comments/${comment.id}`, comment, API_HEADER)
}

export function removeComment(comment){
    return axios.delete(`${API_URL}/comments/${comment.id}`, API_HEADER)
}

export function plusCommentVote(commentid){
    return axios.post(`${API_URL}/comments/${commentid}`, {option: "plusVote"}, API_HEADER)
}

export function minusCommentVote(commentid){
    return axios.post(`${API_URL}/comments/${commentid}`, {option: "minusVote"}, API_HEADER)
}




//  CATEGORIES

export function getAllCategories(){
    return axios.get( `${API_URL}/categories`, API_HEADER)
}


//POSTS

export function getAllPosts(){
    return axios.get(`${API_URL}/posts`, API_URL)
}

export function writePost(post){
    return axios.get(`${API_URL}/posts`,API_HEADER)
}

export function updatePost(post){
    return axios.put(`${API_URL}/posts/${post.id}`,post, API_HEADER)
}

export function getPostbyCategory(category){
    return axios.get(`${API_URL}/${category}/posts`, API_HEADER)
}

export function getPostRefID(postid){
    return axios.get(`${API_URL}/posts/${postid}`, API_HEADER)
}

export function plusPostVote(postid){
    return axios.post(`${API_URL}/posts/${postid}`,{option: "plusVote"}, API_HEADER)
}

export function minusPostVote(postid){
    return axios.post(`${API_URL}/posts/${postid}`,{option: "minusVote"}, API_HEADER )
}

export function removePost(postid){
    return axios.delete()`${API_URL}/posts/${postid}`,API_HEADER
}
