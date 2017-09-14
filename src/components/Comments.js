import React from 'react';
import { bindActionCreators } from 'redux';
import * as postActions from '../actions/posts';
import * as commentActions from '../actions/comments';
import { connect } from 'react-redux';
import * as helpers from '../utils/helpers';
import Vote from './Vote';
import Modal from 'react-modal'