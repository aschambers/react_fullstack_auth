import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userSignupRequest } from '../actions/index';
// field component only knows how to interact with redux-form, not render anything on screen
class SignupForm extends Component {

	constructor() {
        super();
        this.state = {
          myName:'Name'
        };
    }

	static contextTypes = {
  		router: PropTypes.object.isRequired
	}


	renderField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? '' : ''}`;

		return (
			// the field.meta.error property is automatically added from our validate function
			<div className={className}>
				<label>{field.label}</label>
				<input
					className="form-control"
					type="text"
					// want all the properties of object to be communicated as input tag
					// so we don't have to have all these events
					{...field.input}
				/>
				<div className="text-help">
					{touched ? error : ''} 
				</div>
			</div>
			// ^ if the field is touched ^ show an error if one exists, otherwise empty string ^
		);
	}

	passField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? '' : ''}`;

		return (
			// the field.meta.error property is automatically added from our validate function
			<div className={className}>
				<label>{field.label}</label>
				<input
					className="form-control"
					type="password"
					// want all the properties of object to be communicated as input tag
					// so we don't have to have all these events
					{...field.input}
				/>
				<div className="text-help">
					{touched ? error : ''} 
				</div>
			</div>
			// ^ if the field is touched ^ show an error if one exists, otherwise empty string ^
		);
	}
	// get for submit values
	onSubmit(values) {
		console.log("value: " + values.name);
		console.log(this.props);
		// false/undefined initially before post request
		console.log(this.props.auth);
		this.props.userSignupRequest(values)
		.then(response => {
			console.log(this.props.auth);
			if(this.props.auth === 'username-taken') {
				console.log('username is taken');
				alert('Username already in use.');
			}
			if(this.props.auth === 'email-taken') {
				console.log('email is taken');
				alert('Email already in use.');
			}
		});
		window.location.reload();
		this.context.router.history.push('/');
	}

	// can name label anything we want and have it show up in renderField function
	render() {
		// handle form submission, run reduxForm side of things with error checking
		const { handleSubmit } = this.props; 
		return (
			// we need to bind this because we are receiving a callback
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))} style={{ width: '50%', margin: '0 auto', marginTop: '2em' }}>
				<Field
					label="Name"
					name="name"
					component={this.renderField}
				/>
				<Field
					label="Email"
					name="email"
					component={this.renderField}
				/>
				<Field
					label="Username"
					name="username"
					component={this.renderField}
				/>
				<Field
					label="Password"
					name="password"
					component={this.passField}
				/>
				<Field
					label="Confirm Password"
					name="passconfirm"
					component={this.passField}
				/>
				<button type="submit" style={{ float: 'right' }} className="">Submit</button>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	if(!values.name) {
		errors.name = "Please enter your name";
	}
	if(!values.email) {
		errors.email = "Please enter your email";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    	errors.email = 'Invalid email address'
  	}
	if(!values.username) {
		errors.username = "Please enter your username";
	}
	if(!values.password) {
		errors.password = "Please enter your password";
	}
	if(values.password !== values.passconfirm) {
		errors.passconfirm = "Passwords don't match"
	}
	// if errors is empty, the form is fine to submit
	return errors;
}

SignupForm.propTypes = {
	userSignupRequest: PropTypes.func.isRequired﻿
}

// get the value of auth from all reducers as state, and connect redux state
// of auth to the class SignupForm
function mapStateToProps(state) {
	return {
		// reason it's state.auth, is because we set our authReducer equal to
		// auth in the combine reducers function, which pipes all reducers back to us
		auth: state.auth
	};
}

// SignupForm.contextTypes = {
// 	router: PropTypes.object.isRequired﻿
// }

// only requirement is that the form has to be unique
// reduxForm won't try to merge state, will handle correctly
// make sure the string assigned to form is unique
export default reduxForm({
	validate,
	form: 'SignupForm'
})(
	connect(mapStateToProps, { userSignupRequest })(SignupForm)
);