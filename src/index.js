import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import routes from './route'
import { loadAllCategories } from './actions/categories';
import reducer from './reducers'
import {createStore, applyMiddleware} from 'redux'

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  )

  store.dispatch(loadAllCategories())
  
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
  registerServiceWorker();
