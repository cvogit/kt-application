import React, { Component } from 'react';
import ReactPaginate 	from 'react-paginate';

/* global gapi */

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class UserFeed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gmail_id: [],
			gmail: 		[],
			nextPageToken: '',

		};
		this.getGoogleMail			= this.getGoogleMail.bind(this);

	}

	componentWillMount() {
		this.getGoogleMail(2);
	}

	componentDidMount() {
		
	}

	getGoogleMail(pMaxResult = 10, nextPageToken = null) {
		var request = gapi.client.gmail.users.messages.list({
	    'userId': 'me',
	    'maxResults': pMaxResult,
	    'pageToken': nextPageToken,
	  });

	  request.execute(function(response) {
	   	var tGMailId = response.messages;
	   	var tGMails = [];

	   	for( var i = 0; i < tGMailId.length; i++) {
	   		console.log("For message id: " + tGMailId[i].id);
				var tRequest = gapi.client.gmail.users.messages.get({
			    'userId': 'me',
			    'id': tGMailId[i].id,
			  });

				tRequest.execute(function(response) { 
					console.log(response);
				});
	   	}

    });
	}

	setGoogleMailData(pMessages, pNextPageToken) {
		/*var newMessages = this.state.messages.concat(result);

		this.setState({
			popUp: arg.message,
			nextPageToken: pNextPageToken,
		});*/
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