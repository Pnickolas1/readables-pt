import React, { Component } from 'react';
import Post from './Post';

class PostList extends Component {
        render(){
            return (
                <div>
                    {this.props.posts ? this.props.posts.map(post => (
                        <Post post={post} key={post.id} />
                    )) : []}
                </div>
            )
        }
    }

export default PostList;
