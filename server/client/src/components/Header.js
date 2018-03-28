import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// making class based, so we can easily organize code inside
class Header extends Component {

	renderContent() {
		// inspect auth property and change header as appropriate
		switch(this.props.auth) {
			case null:
				return ''
			case false:
				return (
					<div>
						<li>
							<Link to="/register">Register</Link>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>
					</div>
				);
			default:
				return (
					<div>
						<li>
							<a href="/api/logout">Logout</a>
						</li>
					</div>
				);
		}
	}

	render() {
		return (
			<nav className="navbar-fixed light-blue darken-3">
				<div className="nav-wrapper">
					<Link to={this.props.auth ? '/dashboard' : '/'} className="left brand-logo" style={{ paddingLeft: '0.5em' }}>
						Home
					</Link>
					<ul className="right">
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		);
	}
}
// can be refactored
function mapStateToProps(state) {
	return {
		// reason it's state.auth, is because we set our authReducer equal to
		// auth in the combine reducers function, which pipes all reducers back to us
		auth: state.auth
	};
}
// make sure to put mapStateToProps as arg 1, then arg2 null or mapDispatchToProps
export default connect(mapStateToProps, null)(Header);
