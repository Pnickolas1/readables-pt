import React, { Component } from 'react';
import Comments from '../Comments';
import * as actions from '../../actions/posts';
import * as helpers from '../../utils/helper';
import Vote from '../Vote';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Redirect } from 'react-router';

class Post extends Component {
    
    
    state = {
        post: this.props.post,
        comments: this.props.comments,
        displayBody: this.props.body,
        displayComment: this.props.displayComment,
        categories: this.props.categories,
        editPost: {
            'title': '',
            'body': '',
            'category':''
        },
        makeEdits: false,
        openModal: false,
        }

    componentWillReceiveProps(newProps){
        if(newProps.post){
            this.setState({
                post: newProps.post,
                comments: newProps.comments,
                displayBody: newProps.displayBody,
                displayComment: newProps.displayComment,
                categories: newProps.categories
            })
            } else {
                this.setState({
                    post: null,
                    comments: [],
                    displayBody: false,
                    displayComment: false,
                    categories: newProps.categories,
                    })
                }
            }
        
    deletePost = e => {
        e.preventDefault()
        this.props.actions.deletePost(this.state.post.id)
    }

    editPost = e => {
        e.preventDefault()
        let PostDuplicate = this.state.post
        this.setState({
            editPost: PostDuplicate,
            makeEdits: true, 
            openModal: true
        })
    }

    minimizeModal(e){
        e.preventDefault();
        this.setState({
            openModal: false
        })
    }

    handleInputChange(e){
        let key= e.target.id;
        let editPost = this.state.editPost
        editPost[key] = e.target.value
        this.setState({
            editPost: editPost
        })
    }

    savePost = e => {
        e.preventDefault();
        this.props.actions.editPost(this.state.editPost)
        this.setState({
            editPost: {},
            openModal: false
        })
    }

    render() {
        if(this.state.post){
            return (
                <div classNam="row">
                    <div className="col-md-12">
                        <div className="card margin-top-10" key={this.state.post.id}>
                            <div className="card-body">
                                <h3 className="card-title">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <a href={'/'+this.state.post.category+'/'+this.state.post.id}>{this.state.post.title}</a><span className="text-muted" style={{fontSize: 16}}>{helpers.time(this.state.post.timestamp)}</span>
                                        </div>
                                        <div className="col-md-2 ml-md-auto">
                                            <button className="btn btn-info btn-sm margin-15" id={this.state.post.id} onClick={this.editPost}><i className="fa fa-pencil"></i></button>
                                            <button className="btn btn-danger btn-sm" id={this.state.post.id} onClick={this.deletePost.bind(this)}><i className="fa fa-trash"></i></button>
                                        </div>
                                    </div>
                                </h3>
                            <h6 className="card-subtitle mb-2 text-muted">Author: {this.state.post.author}</h6>
                            { this.state.displayBody ? <h4>{this.state.post.body}</h4>: ''}
                            <div className="row">
                                <div className="col-md-2">
                                    <p style={{fontsize:"14px", marginBottom:0 }}>Votes: {this.state.post.voteTotal}</p>
                                    <Vote size={20} id={this.state.post.id} type={"post"} />
                                </div>
                            </div>
                        </div>
                        {this.state.comments  && this.props.showComments ? <div className="card-footer">
                            <Comments comments={this.state.comments} post={this.state.post} />
                        </div>: ""}
                    </div>


                    <Modal isOpen={this.state.openModal} contentLabel="Create Modal">
                        <i className="fa fa-close pull-right" onClick={this.minimizeModal.bind(this)}></i>
                        <div className="row">
                            <div className="col-md-12">
                                <h4>Edit</h4>
                            <form onSubmit={this.savePost}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-control" id="title" placeholder="Title" onChange={this.handleInputChange.bind(this)} value={this.state.editPost.title} required={true} />
                                </div>
                                <div className="form-group">
                                    <label>Comment</label>
                                    <textarea className="form-control" id="body" placeholder="whats on your mind?" onChange={this.handleInputChange.bind(this)} value={this.state.editPost} required={true} />
                                </div>
                                <div className="form-check">
                                    <label>Categories</label>
                                            <select className="form-control" id="category" value={this.state.editPost.category} onChange={this.handleInputChange.bind(this)} required={true}>
                                                {this.state.categories.map(category => (
                                                    <option value={category.name} key={category.path}>{category.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    <button type="submit" className="btn btn-danger">Update</button>
                                </form>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>          
            )
        }
        return (
            <Redirect to={"/"} />
        )
    }
}

function mapStateToProps(state){
    return {
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);

