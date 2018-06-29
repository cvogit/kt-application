import React, { Component } from 'react';

import '../assets/react-toolbox/theme.css';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import theme from '../assets/react-toolbox/theme.js';

import Snackbar from 'react-toolbox/lib/snackbar/Snackbar';

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
			isError			: 	false,
			errorContent: 	"",
			snackbarActive 		: 	false,
			snackbarMessage 	:  	'',
		}

		this.AppReady 			= this.AppReady.bind(this);
		this.LoginSuccess 	= this.LoginSuccess.bind(this);
		this.LoggedOut			= this.LoggedOut.bind(this);
		this.OfflineError 	= this.OfflineError.bind(this);
		this.ResetError 		= this.ResetError.bind(this);
		this.handleSnackbarMessage = this.handleSnackbarMessage.bind(this);
		this.handleSnackbarTimeout = this.handleSnackbarTimeout.bind(this);
	}

	componentDidMount() {
		ipcRenderer.on('appReady', 			this.AppReady);
		ipcRenderer.on('loginSuccess', 	this.LoginSuccess);
		ipcRenderer.on('loggedOut', 		this.LoggedOut);
		ipcRenderer.on('offlineError', 	this.OfflineError);
		ipcRenderer.on('snackbarMessage', this.handleSnackbarMessage);
	}


	AppReady(event, arg)	{
		this.setState({
			isLoading: 		!arg,
		})
	}

	LoginSuccess(event)	{
		this.setState({
			isLoggedIn: true,
			isLoading: 	true,
		});
	}

	LoggedOut(event)	{
		this.setState({
			isLoggedIn: 	false,
		});
	}

	handleSnackbarMessage(event, message) {
		this.setState({
			snackbarMessage: message,
			snackbarActive: true,
		});
	}

	handleSnackbarTimeout(event, instance) {
    this.setState({ snackbarActive: false });
  };

	OfflineError(event, arg) {
		this.setState({
			isError			: 	true,
			errorContent: 	arg,
		});

		setTimeout(this.ResetError, 3000);
	}

	ResetError() {
		this.setState({
			isError			: 	false,
			errorContent: 	"",
		});
	}

	RenderApp = () => {
		const isLoggedIn 	= this.state.isLoggedIn;
		const isLoading  	= this.state.isLoading;
		const isError 		= this.state.isError;
		const errorContent= this.state.errorContent;
		
		var snackbar = null;
		if(this.state.snackbarActive) {
			snackbar =	<div className="snackbar">
										<h3>{this.state.snackbarMessage}</h3>
									</div>
		}
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
				{snackbar}
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