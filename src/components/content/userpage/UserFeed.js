import React, { Component } from 'react';
import ReactPaginate 	from 'react-paginate';
import Button from 'react-toolbox/lib/button/Button';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import MailSnippet 	from './MailSnippet';

/* global gapi */

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class UserFeed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mails: 		[],
			nextPageToken: '', 

		};
		this.getGoogleMail	= this.getGoogleMail.bind(this);
		this.addMail	= this.addMail.bind(this);

	}

	componentWillMount() {
		this.getGoogleMail(10, this.state.nextPageToken);
	}

	getGoogleMail(pMaxResult = 10, nextPageToken = null) {
		var request = gapi.client.gmail.users.messages.list({
	    'userId': 'me',
	    'maxResults': pMaxResult,
	    'pageToken': nextPageToken,
	  });

	  request.execute((response) => {

	  	var tGMailId = response.messages;
	   	for( var i = 0; i < tGMailId.length; i++) {
				var tRequest = gapi.client.gmail.users.messages.get({
			    'userId': 'me',
			    'id': tGMailId[i].id,
			  });

				tRequest.execute((response) => { 
					var tMessageArray = [];
					var tPayload = response.payload.parts;
					tPayload.forEach(function(part) {
						var tMessage = atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
					  tMessageArray.push(tMessage);
					});

					var tMail = {
						Id: this.state.mails.length,
						From: response.payload.headers.find( header => header.name === 'From' ),
						Subject: response.payload.headers.find( header => header.name === 'Subject' ),
						Date: response.payload.headers.find( header => header.name === 'Date' ),
						Payload: tMessageArray,
					};
    			this.addMail(tMail);
	   		});
			}
    });
  }

  addMail(pMail) {
  	const currentMails = this.state.mails;
  	const newMails = currentMails.concat(pMail);
  	this.setState({
  		mails: newMails
  	});
  }

	RenderUserFeed = () => {
		var mail = <div></div>;
		if(this.state.mails.length > 0) {
			var html = this.state.mails[0].Payload[1];
			mail = <div dangerouslySetInnerHTML={{__html: html}}></div>;
		}
		var mailSnippets = this.state.mails.map(function(mail) {
				return <MailSnippet key={mail.Id}
														subject={mail.Subject.value}
														date={mail.Date.value}
														from={mail.From.value} />;
			});

		return (
			<div className="userpage-center-content">
				<div className="mail-buttons">
					<Button />
				</div>
				<div className="mail-content">
				{mail}
				</div>
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