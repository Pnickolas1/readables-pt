import React, { Component } from 'react';
import { Navbar } from '../Navbar';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/posts';
import { connect } from 'react-redux';
import PostList from './PostList';
import * as helpers from '../../utils/helper';
import Modal from 'react-modal';

class PostsPage extends Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            posts: this.props.posts,
            sort: this.props.sort,
            categories: this.props.categories,
            openModal: false,
            makeEdits: false,
            newPost: {
                'title': '',
                'body': '',
                'category':''
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

    let post = this.state.post.newPost;
    post['id'] = helpers.generateId();
    post['time'] = Date.now()
    post['author'] = 'LateRndPick';
    post['voteTotal'] = 1
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
            <div className="container-fluid" style={{padding:0}}>
                <Navbar />
                <div className="container">
                    <div className="row margin-top-10">
                        <div className="col-md-12">
                            <label className="control-label">Category</label>
                            <div className="alert alert-info" role="alert">
                                {this.state.categories.map(category => (
                                    <a href={"/"+category.path} style={{textDecorationColor: null}} key={category.path} className="margin-20">
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
                    <select className="form-control" value={this.state.sort} onChange={this.updateSort.bind(this)}>
                    <option value="voteTotal">Vote Total</option>
                    <option value="time">Time</option>         
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

                <Modal isOpen={this.state.openModal} contentLabel="Create Modal">
                <i className="fa fa-close pull-right" onClick={this.closeModal}></i>
                <div className="row">
                    <div className="col-md-12">
                        <h4>Write New Post</h4>
                        <form onSubmit={this.createPost}>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" id="title" placeholder="Title" value={this.state.newPost.title} onChange={this.handleChange.bind(this)} required={true}/>
                        </div>
                        <div className="form-group">
                            <label>Comment</label>
                            <textarea className="form-control" id="body" placeholder="whats on your mind?"  onChange={this.handleChange.bind(this)} required={true}/>
                        </div>
                        <div className="form-check">
                            <label>Category </label>
                            <select className="form-control" id="category" onChange={this.handleChange.bind(this)} required={true}>
                            {this.state.categories.map(category => (
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
        sort: 'voteTotal',
        categorgies: state.categorgies
    }
}


function mapDispatchToProps(dispatch){
    return { actions: bindActionCreators(actions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);