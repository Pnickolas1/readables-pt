import React from 'react';
import { Route } from 'react-router';
import PostsPage from './components/Posts/PostsPage';
import PostPost from './components/Posts/PostPage';
import CategoryPage from './components/Category/CategoryPage';

export default (
    <div>
        <Route path='/' exact component={PostPage}/>
    </div>
);


