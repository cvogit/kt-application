import React, { Component } from 'react';

import '../assets/react-toolbox/theme.css';
import theme from '../assets/react-toolbox/theme.js';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

import Dashboard from './Dashboard';
import Loading from './commons/Loading';
import PopUp from './commons/PopUp';
import Welcome from './Welcome';

import '../css/app.css';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class App extends Component {

	constructor() {
		super();
		this.state = {
			isLoggedIn	: 	false,
			isLoading		: 	false,
		},

		this.handleLoginSuccess 	= this.handleLoginSuccess.bind(this);
		this.handleLoggedOut			= this.handleLoggedOut.bind(this);
		this.handleAppReady 			= this.handleAppReady.bind(this);
	}

	componentDidMount() {
		ipcRenderer.on('loggedOut', 		this.handleLoggedOut);
		ipcRenderer.on('loginSuccess', 	this.handleLoginSuccess);
		ipcRenderer.on('appReady', 			this.handleAppReady);
	}


	handleAppReady(event)	{
		setTimeout(() => {
			this.setState({
				isLoading: 		false,
			})
		}, 1500);
	}

	handleLoginSuccess(event)	{
		this.setState({
			isLoggedIn: true,
			isLoading: 	true,
		});
	}

	handleLoggedOut(event)	{
		this.setState({
			isLoggedIn: 	false,
		});
	}

	RenderApp = () => {
		const isLoggedIn 	= this.state.isLoggedIn;
		const isLoading  	= this.state.isLoading;
		
		return (
			<div className="app-body">
				{	isLoggedIn 
					?	<Dashboard />
					: <Welcome />
				}
				{
					isLoading
					? <Loading />
					: null
				}
			</div>
			);
	};

	render() {

		return (
			<ThemeProvider theme={theme}>
				<this.RenderApp />
			</ThemeProvider>
		);
	}
}

export default App;