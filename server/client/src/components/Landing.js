import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component {
	
	render() {
		console.log(this.props.auth);
		return (
			<div>
				<h2>Landing</h2>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}

export default connect(mapStateToProps, null)(Landing);