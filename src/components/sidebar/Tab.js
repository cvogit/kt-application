import React, { Component } from 'react';

import '../../css/sidebar/tab.css';

class Tab extends Component {


	componentDidMount() {
	}

	render() {	
		return (
			<div className="tab">
				{this.props.role}
			</div>
		);
	}
}

export default Tab;