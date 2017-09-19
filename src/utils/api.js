import axios from 'axios'

const API_URL = "http://localhost:3001"
const APP_HEADER =  { headers: { 'Authorization': 'LateRoundPick', 'Content-Type': 'application/json' }}




// Categories  
export function getAllCategories() {
    return axios.get(API_URL+"/categories", APP_HEADER)
  }
  
  //Posts Endpoints 
  export function getAllPosts() {
    return axios.get(API_URL+"/posts", APP_HEADER)
  }
  
  export function createPost(post) {
    return axios.post(API_URL+"/posts",post,APP_HEADER )
  }
  
  export function updatePost(post) {
    return axios.put(API_URL+"/posts/"+post.id, post, APP_HEADER)
  }
  
  export function getPostsByCategory(category) {
    return axios.get(API_URL+"/"+category+"/posts", APP_HEADER)
  }
  
  export function getPostById(postId) {
    return axios.get(API_URL+"/posts/"+postId, APP_HEADER)
  }
  
  export function incrementPostVote(postId) {
    return axios.post(API_URL+"/posts/"+postId,{option: "upVote"}, APP_HEADER)
  }
  
  export function decrementPostVote(postId) {
    return axios.post(API_URL+"/posts/"+postId,{option: "downVote"}, APP_HEADER)
  }
  
  export function deletePost(postId) {
    return axios.delete(API_URL+"/posts/"+postId, APP_HEADER)
  }
  
  
 //Comments Endpoints
  export function getComments() {
    return axios.get(API_URL+"/comments", APP_HEADER)
  }
  export function getCommentsById(postId) {
    return axios.get(API_URL+"/posts/"+postId+"/comments", APP_HEADER)
  }
  
  export function createComment(comment) {
    return axios.post(API_URL+"/comments",comment,APP_HEADER )
  }
  
  export function updateComment(comment) {
    return axios.put(API_URL+"/comments/"+comment.id, comment, APP_HEADER)
  }
  
  export function deleteComment(commentId) {
    return axios.delete(API_URL+"/comments/"+commentId, APP_HEADER)
  }
  
  export function incrementCommentVote(commentId) {
    return axios.post(API_URL+"/comments/"+commentId,{option: "upVote"}, APP_HEADER)
  }
  
  export function decrementCommentVote(commentId) {
    return axios.post(API_URL+"/comments/"+commentId,{option: "downVote"}, APP_HEADER)
  }