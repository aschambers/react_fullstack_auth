import React, { Component } from 'react';
import SignupForm from './SignupForm';

class Register extends Component {
	render() {
		return (
			<div>
				<h3 style={{ textAlign: 'center' }}>Register</h3>
				<SignupForm />
			</div>
		);
	}
}

export default Register;