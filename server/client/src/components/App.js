import React, { Component } from 'react';
// BrowserRouter is the brains, tells it how to behave
// looks at url and changes component, at most one child
// Route is used to set up a rule, and set of components
// that are actuall visible on the screen
import { BrowserRouter, Route } from 'react-router-dom';
// give components the ability to call action creators
import { connect } from 'react-redux';
// get all actions and assign to actions variable
import * as actions from '../actions';
import Header from './Header.js';
import Landing from './Landing.js';
import Register from './Register.js';
import Login from './Login.js';
import Dashboard from './Dashboard.js';

// if we want a component to always be visible, it doesn't need to be a route
// can just be an instance of that component
class App extends Component {
	// fetch current user the instant this component has been rendered on the screen
	// preferred location to make ajax request over componentWillMount which can get
	// called multiple times rather than once
	componentDidMount() {
		// gets the action fetchUser
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/dashboard" component={Dashboard} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

// first mapStateToProps, second mapDispatchToProps (all actions)
// once we pass in all the actions, they are assigned to the App component as props
export default connect(null, actions)(App);
