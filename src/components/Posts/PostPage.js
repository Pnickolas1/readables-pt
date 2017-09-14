import React, { Component } from 'react';
import { Navbar } from '../Navbar';
import { bindActionCreators } from 'redux';
import * as postActions from '../../actions/posts';
import * as commentActions from '../../actions/comments';
import { connect } from 'react-redux';
import Post from './Post';

class PostPage extends Component {


    state = {
        post: this.props.posts, 
        comments: this.props.comments,
        categories: this.props.categories
    }

    componentWillMount(){
        let postid = this.props.match.params.id
        this.props.actions.loadPostRedId(postid)
        this.props.actions.loadComments(postid)
    }

    componentWillReceiveProps(newProps){
        this.setState({
            post: newProps.posts[0],
            comments: newProps.comments
        })
    }


    render() {
        return (
            <div className="container-fluid" style={{padding:0}}>
                <Navbar />
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Post post={this.state.post} displayBody={true}  comments={this.state.comments} showComments={true} />
                        </div>
                    </div>
                </div>
            </div>    
        )
    }
}

function mapStateToProps(state){
    return {
        posts: state.posts,
        comments: state.comments
    }
}

function mapDispatchToProps(dispatch){
    let actions = {...postActions, ...commentActions};
    return { actions: bindActionCreators(actions, dispatch)}
}


export default connect(mapStateToProps, mapDispatchToProps)(PostPage);