import _ from 'lodash'
import moment from 'moment'
const shortid = require('shortid')

export function sort(state, type='voteScore'){
    return _.orderBy(state, type, 'asc')
}


export function time(timestamp) {
    return moment(timestamp).fromNow()
  }


export const generateId = shortid.generate();


export function isEmpty(object) {
    return _.isEmpty(object)
  }

  export function getCommentsCount(comments, postId) {
    return comments.filter(comment => comment.parentId === postId).length
  }