import _ from 'lodash'
import moment from 'moment'

export function sort(state, type='voteTotal'){
    return _.orderBy(state, type, 'asc')
}


export function time(timestamp) {
    return moment(timestamp).fromNow()
  }
  

export function generateId() {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}



