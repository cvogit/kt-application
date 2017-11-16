import React, { Component } from 'react';

import logo from '../images/logo.svg';
import '../css/Head.css';

class Head extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to electron-api-test</h2>
				</div>
				<p className="App-intro">
					To get started, use the api below or try your own.
				</p>
			</div>
		);
	}
}

export default Head;