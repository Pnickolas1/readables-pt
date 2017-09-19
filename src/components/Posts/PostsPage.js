import React, { Component } from 'react';
import { Navbar } from '../Navbar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostList from './PostList';
import * as helpers from '../../utils/helper';
import Modal from 'react-modal';
import * as postactions from "../../actions/posts";
import * as commentactions from "../../actions/comments";
const shortid = require('shortid')


class PostsPage extends Component {
    constructor(props, context){
        super(props, context);
        this.updateSort = this.updateSort.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            openModal: false,
            makeEdits: false,
            newPost: {
                'title': '',
                'body': '',
                'category':'redux'
            }
        }
    }

    componentWillMount(){
        this.props.actions.loadAllPosts()
    }

    componentWillReceiveProps(newProps){
        this.setState({
            posts: newProps.posts,
            sort: newProps.sort,
            categories: newProps.categories
        })
    }

    updateSort(e){
        let sort = e.target.value
        this.setState((prevState) => ({
            posts: helpers.sort(prevState.posts, sort),
            sort: sort
        }))
    }

    openModal = () => {
        this.setState({
            openModal: true
        })
    }

    closeModal = () => {
        this.setState({
            openModal: false
        })
    }

    handleChange(e){
        let key = e.target.id
        let newPost = this.state.newPost
        newPost[key] = e.target.value
        this.setState({
            newPost: newPost
        })
    }

    createPost = (e) => {
        e.preventDefault()
        this.setState({
            openModal: false
        })

    let post = this.state.newPost;
    post['id'] = shortid.generate();
    post['timestamp'] = Date.now()
    post['author'] = 'LateRndPick';
    post['voteScore'] = 1
    this.props.actions.makePost(post)
    this.setState({
        newPost: {
            'title': '',
            'body': '',
            'category': ''
            }
        })
    }


    render(){
        return (
        <div className="container">
            <div className="container-fluid" style={{padding:0}}>
                <Navbar />
                <div className="container">
                    <div className="row margin-top-10">
                        <div className="col-md-12">
                            <label className="control-label">Category</label>
                            <div className="alert alert-info" role="alert">
                                {this.props.categories.map(category => (
                                    <a href={"/"+category.path} style={{textDecorationColor: null}} key={category.path} className="margin-12">
                                        <h1 className="badge badge-secondary" style={{fontSize: 14 }}>{category.name}</h1>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            <div className="row margin-top-10">
                <div className="col-md-2">
                    <label className="control-label">Sort Method</label>
                    <select className="form-control" value={this.state.sort} onChange={this.updateSort}>
                    <option value="voteScore">Vote Total</option>
                    <option value="timestamp">Time</option>         
                    </select>
                </div>
                <div className="col-md-2 justify-content-center ml-md-auto">
                    <button className="btn btn-dark margin-top-10" onClick={this.openModal}><i className="fa fa-plus"></i>Post</button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <PostList posts={this.state.posts} />
                </div>
            </div>
        </div>

                <Modal isOpen={this.state.openModal} contentLabel="Create Modal">
                <i className="fa fa-close pull-right" onClick={this.closeModal}></i>
                <div className="row">
                    <div className="col-md-12">
                        <h4>Write New Post</h4>
                        <form onSubmit={this.createPost}>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" id="title" placeholder="Title" value={this.state.newPost.title} onChange={this.handleChange} required={true}/>
                        </div>
                        <div className="form-group">
                            <label>Comment</label>
                            <textarea className="form-control" id="body" placeholder="whats on your mind?"  onChange={this.handleChange} required={true}/>
                        </div>
                        <div className="form-check">
                            <label>Category </label>
                            <select className="form-control" id="category" defaultValue={this.state.newPost.category} onChange={this.handleChange} required={true}>
                            {this.props.categories.map(category => (
                                <option value={category.name} key={category.path}>{category.name}</option>
                            ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Create Post</button>
                        </form>
                    </div>
                </div>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        posts: helpers.sort(state.posts),
        sort: 'voteScore',
        categories: state.categories
    }
}


function mapDispatchToProps(dispatch){
    let actions = {...commentactions, ...postactions}
    return { actions: bindActionCreators(actions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);