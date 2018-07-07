import React, { Component } from 'react';

class UserHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userpageIndex   : 0,

		};
	}
	
	componentWillMount() {

	}
	
	RenderUserHistory = () => {
		return (
			<div className="userpage-center-content">
			</div>
			);
	}

	render() {	
		return (
			<this.RenderUserHistory />
			);
	}
}


export default UserHistory;