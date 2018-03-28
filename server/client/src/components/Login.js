import React, { Component } from 'react';
import LoginForm from './LoginForm';

class Login extends Component {
	render() {
		return (
			<div>
				<h3 style={{ textAlign: 'center' }}>Login</h3>
				<LoginForm />
			</div>
		);
	}
}

export default Login;