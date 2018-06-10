import React, { Component } from 'react';
import ReactPaginate 	from 'react-paginate';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class UserFeed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
		};
	}

	componentWillMount() {
		ipcRenderer.send('userFeedReady');
	}

	componentDidMount() {
	}

	RenderUserFeed = () => {
		return (
			<div className="userpage-center-content">


			</div>
			);
	}

	render() {	
		return (
			<this.RenderUserFeed />
			);
	}
}


export default UserFeed;