import React from 'react';
import Post from './Post';

export default function PostList({post}) {
    return (
        <div>
            {post.map(post => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    )
}