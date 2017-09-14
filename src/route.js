import React from 'react';
import { Route } from 'react-router';
import PostsPage from './components/Posts/PostsPage';
import CategoryPage from './components/Category/CategoryPage';
import PostPage from "./components/Posts/PostPage";




export default (
    <div>
      <Route exact path = "/" component = {PostsPage}/>
      <Route exact path="/:category" component = {CategoryPage} />
      <Route exact path="/:category/:id" component = {PostPage} />
    </div>
  );