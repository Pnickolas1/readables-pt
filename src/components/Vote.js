import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import * as postActions from '../actions/posts';
import * as postComments from '../actions/comments';
import { connect } from 'react-redux';

class Vote extends Component {

    state = {
        size: this.props.size,
        id: this.props.id,
        type: this.props.type
    }

    plusVote = e => {
        e.preventdefault();
        switch(this.state.type) {
            case "post":
                return this.props.actions.addPostVote(this.state.id)
            case "comment":
                return this.props.actions.plusComment(this.state.id)
            default:
                console.log("please check code in vote.js plusVote method")
        }
    }

    minusVote = e => {
        e.preventdefault();
        switch (this.state.type){
            case "post":
                return this.props.actions.minusPostVote(this.state.id)
            case "comment":
                return this.props.actions.minusComment(this.state.id)
            default: 
                console.log("please check code in vote.js minusVote method")
        }
    }

  componentWillReceiveProps(newProps) {
    this.setState({
      size: newProps.size,
      id: newProps.id
    })
  }

  render () {
    return (
      <div className="row">
        <div className="col-md-12">
          <button className="btn btn-success btn-sm" style={{height: this.props.size, width: this.props.size, lineHeight:0}} onClick={this.plusVote} ><i className="fa fa-plus" style={{fontSize: 10, marginLeft: -3, position: "absolute", marginTop: -5}}></i></button>
          <button className="btn btn-danger btn-sm" style={{height: this.props.size, width: this.props.size, lineHeight:0, marginLeft:10}} onClick={this.minusVote} ><i className="fa fa-minus" style={{fontSize: 10, marginLeft: -3, position: "absolute", marginTop: -5}}></i></button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return state
  }


  function mapDispatchToProps(dispatch) {
    let actions = {...postActions, ...postComments};
    return {actions: bindActionCreators(actions, dispatch)}
  }


export default connect(mapStateToProps, mapDispatchToProps)(Vote);
