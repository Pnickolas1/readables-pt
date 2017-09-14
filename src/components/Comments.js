import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as postActions from '../actions/posts';
import * as commentActions from '../actions/comments';
import { connect } from 'react-redux';
import * as helpers from '../utils/helper';
import Vote from './Vote';
import Modal from 'react-modal';


class Comments extends Component {

    state ={
        sort: 'voteTotal',
        comments: helpers.sort(this.props.comments, this.props.sort),
        commentEdit: {},
        openModal: false,
        makeEdits: false
    }

    addComment = e => {
        e.preventDefault()
        let comment = {
            id: helpers.generateId(),
            body: e.target.comment.value,
            parentid: this.props.post.id,
            time: Date.now(),
            author: 'LateRndPick',
            voteTotal: 1
        }
        this.props.actions.makeNewComment(comment)
        e.target.comment.value = ""
    }

    updateSort(e) {
        let sort = e.target.value
        this.setState({
            comments: helpers.sort(this.props.comments, sort),
            sort: sort
        })
    }

    deleteComment = e => {
        e.preventDefault();
        this.props.actions.removeAComment(e.target.id)
    }

    handleChange(e) {
        let key = e.target.id
        let commentEdit = this.state.commentEdit
        commentEdit[key] = e.target.value
        this.setState({
            editPost: commentEdit
        })
    }

    commentEdit = e => {
        e.preventDefault()
        let commentid = e.target.id
        let comments = this.state.comments
        let comment = comments.filter( currenComment => currenComment.id === commentid)
        this.setState({
            openModal: true,
            commentEdit: comment[0]
        })
    }

    saveComment = e => {
        e.preventDefault()
        this.props.actions.editComment(this.state.editComment)
        this.setState({
            openModal: false,
            editComment: {}
        })
    }

    closeModal (e) {
        e.preventDefault()
        this.setState({
            openModal: false
        })
    }

    render() {
        return (
            <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-2">
                  <label className="control-label"><b>Comments</b></label>
                </div>
                <div className="col-md-4 ml-md-auto">
              <label className="control-label">Sort</label>
              <select className="form-control sort-by-selection" value={this.state.sort} onChange={this.updateSort.bind(this)}>
                <option value="voteTotal">Vote Total</option>
                <option value="time">Time</option>
              </select>
            </div>
            </div>
          <div className="row margin-top-10">
            <div className="col-md-12">
              {this.state.comments.map(comment => (
                <div className="" key={comment.id}>
                  <h6 style={{marginBottom: 2}} className="margin-top-10"><b>{comment.author}:</b>
                    <span className="text-muted">{helpers.time(comment.time)}</span> &nbsp;
                    <span><i className="fa fa-pencil-square text-info" id={comment.id} onClick={this.commentEdit.bind(this)}></i></span>;
                    <span><i onClick={this.deleteComment.bind(this)} id={comment.id} className="fa fa-minus-square text-danger"></i></span> ;
                  </h6>
                  <span className="text-muted">{comment.body}</span>
                  <p style={{marginBottom:0}}>Votes {comment.voteTotal}</p>
                  <Vote size={20} id={comment.id} type={"comment"} />
                </div>
              ))}
              <form onSubmit={this.addComment} className="margin-top-10">
                <div className="row">
                  <div className="col-md-6">
                    <input type="text" required name="comment" placeholder="Enter your comment" className="form-control"/>
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-dark btn-md" type="submit">Comment</button>
                  </div>
                </div>
              </form>

              <Modal isOpen={this.state.openModal} contentLabel="Create Modal">
                <i className="fa fa-close pull-right" onClick={this.closeModal.bind(this)}></i>
                <div className="row">
                  <div className="col-md-12">
                    <h4>Edit</h4>
                    <form onSubmit={this.saveComment}>
                      <div className="form-group">
                        <label>Comment</label>
                        <textarea className="form-control" id="body" placeholder="What's on your mind?"  onChange={this.handleChange.bind(this)} value={this.state.commentEdit.body} required={true}/>
                      </div>
                     <button type="submit" className="btn btn-primary">Edit Comment</button>
                    </form>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
        )
    }
}

function mapStateToProps({comments}){
    return {comments}
}

function mapDispatchToProps(dispatch){
    let actions = {...postActions, ...commentActions};
    return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);