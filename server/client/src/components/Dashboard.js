import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Dashboard extends Component {


	static contextTypes = {
  		router: PropTypes.object.isRequired
	}
	
	render() {
		// console.log(this.props.auth ? '/dashboard' : this.context.router.history.push('/'));
		// console.log(this.props.auth);
		return (
			<div>
				<h2>Dashboard</h2>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps, null)(Dashboard);
