import React, { Component } from 'react';
import { Navbar } from '../Navbar';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/posts';
import { connect } from 'react-redux';
import * as helpers from '../../utils/helper';
import PostList from '../Posts/PostList';

class CategoryPage extends Component {
    constructor(props, context) {
        super(props, context)
            this.updateSort = this.updateSort.bind(this)
    }
        state = {
            sort: 'voteTotal'
        }
    

    componentWillMount(){
        let category = this.props.match.params.category
        this.props.actions.loadPostsByCategory(category)
    }

    componentWillReceiveProps(newProps){
        this.setState({
            posts: newProps.posts,
            categories: newProps.categories,
            sort: newProps.sort
        })
    }

    updateSort (e) {
    let sort = e.target.value
    this.setState({
      posts: helpers.sort(this.props.posts, sort),
      sort: sort
    })
  }



    render() {
        return (
            <div className="container-fluid" style={{padding:0}}>
                <Navbar />
                <div className="container">
                    <div className="row margin-top-10">
                        <div className="col-md-12">
                            <label className="control-label">Category</label>
                            <div className="alert alert-info" role="alert">
                                {this.props.categories.map(category => (
                                    <a href={"/"+category.path} style={{textDecorationColor: null}} key={category.path} className="margin-15"><h1 className="badge badge-secondary" style={{fontSize:14}}>{category.name}</h1></a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="row margin-top-10">
                        <div className="col-md-2">
                            <label className="control-label">Sort</label>
                            <select className="form-control" value={this.state.sort} onChange={this.updateSort}>
                                <option value="voteTotal">Votes</option>
                                <option value="timestamp">Time</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <PostList posts={this.state.posts} />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

function mapSateToProps(state){
    return {
        posts: state.posts,
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch){
    return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapSateToProps, mapDispatchToProps)(CategoryPage);