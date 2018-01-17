import React, { Component } from 'react';

import '../../css/commons/result.css';

class Result extends Component {

	render() {

		return (
			<div className="result-container">
				<div className="result-header">
					<h1>Result</h1>
				</div>
				<div className="result-content">
					<h5>{this.props.message}</h5>
				</div>
				<div className="result-resolve">
					<input readOnly className="ok-btn" onClick={this.props.handleRegisterResultCancel} value="OK" />
				</div>
			</div>
		);
	}
}

export default Result;