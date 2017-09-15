import React, { Component } from 'react';
import { Navbar } from '../Navbar';
import { bindActionCreators } from 'redux';
import * as postActions from '../../actions/posts';
import * as commentActions from '../../actions/comments';
import { connect } from 'react-redux';
import Post from './Post';

class PostPage extends Component {

    componentWillMount(){
        let postid = this.props.match.params.id
        this.props.actions.loadPostRefId(postid)
        this.props.actions.loadComments(postid)
    }

    componentWillReceiveProps(newProps){
        if(newProps.posts === null) {
            return newProps.history.push("/404")
        }
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
                           {this.props.posts[0]} <Post post={this.props.post[0]} displayBody={true}  comments={this.props.comments} showComments={true} />
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