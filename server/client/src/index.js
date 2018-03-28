// doesn't have to be here, can be in App or another file
// has to include file extension because it's a css file
// import materializeCSS from 'materialize-css/dist/css/materialize.min.css';
// refactor materialize-css syntax
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
// get main App component
import App from './components/App.js';
import reducers from './reducers';
// create redux store and hook it up to react side of our application
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
// provider tag is a react component that knows how to read changes from
// the redux store, it will inform all child components of the new state
ReactDOM.render(
	<Provider store={store}><App /></Provider>, 
	document.querySelector('#root')
);
