import React, { Component } from 'react';
import ReactPaginate 	from 'react-paginate';
import Button from 'react-toolbox/lib/button/Button';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import MailSnippet 	from './MailSnippet';

/* global gapi */

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class UserFeed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inbox: 		[],
			sent:     [],
			nextInboxPageToken: '', 
			buttons: 'Inbox Sent',
			buttonActive: 'Inbox',
			dialogActive: false,
			dialogContent: '',
		};
		this.getGoogleInboxMail	= this.getGoogleInboxMail.bind(this);
		this.getGoogleSentMail	= this.getGoogleSentMail.bind(this);

		this.addMail				= this.addMail.bind(this);
		this.handleDialogToggle	= this.handleDialogToggle.bind(this);
		this.handleButtonSelect = this.handleButtonSelect.bind(this);
	}

	componentWillMount() {
		this.getGoogleInboxMail(10, this.state.nextInboxPageToken);
		this.getGoogleSentMail(10, this.state.nextSentPageToken);
	}

	getGoogleInboxMail(pMaxResult = 10, nextPageToken = null) {
		var request = gapi.client.gmail.users.messages.list({
	    'userId': 'me',
	    'maxResults': pMaxResult,
	    'q': 'in:inbox',
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
					var tAttachmentId = [];
					var tPayload = response.payload.parts;

					tPayload.forEach(function(part) {
						if(part.body.size !== 0) {
							if(part.body.data) {
								var tMessage = atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
						  	tMessageArray.push(tMessage);
						  } else if (part.body.attachmentId) {
						  	tAttachmentId.push(part.body.attachmentId);
						  }
					  }
					});

					var tMail = {
						Id: this.state.inbox.length,
						From: response.payload.headers.find( header => header.name === 'From' ),
						Subject: response.payload.headers.find( header => header.name === 'Subject' ),
						Snippet: response.snippet,
						Date: response.payload.headers.find( header => header.name === 'Date' ),
						Payload: tMessageArray,
						AttachmentId: tAttachmentId,
					};
    			this.addMail(tMail, 'Inbox');
	   		});
			}
    });
  }

  getGoogleSentMail(pMaxResult = 10, nextPageToken = null) {
		var request = gapi.client.gmail.users.messages.list({
	    'userId': 'me',
	    'maxResults': pMaxResult,
	    'q': 'in:sent',
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
					var tAttachmentId = [];
					var tPayload = response.payload.parts;
					
					tPayload.forEach(function(part) {
						if(part.body.size !== 0) {
							if(part.body.data) {
								var tMessage = atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
						  	tMessageArray.push(tMessage);
						  } else if (part.body.attachmentId) {
						  	tAttachmentId.push(part.body.attachmentId);
						  }
					  }
					});
					
					var tMail = {
						Id: this.state.sent.length,
						To: response.payload.headers.find( header => header.name === 'To' ),
						Subject: response.payload.headers.find( header => header.name === 'Subject' ),
						Snippet: response.snippet,
						Date: response.payload.headers.find( header => header.name === 'Date' ),
						Payload: tMessageArray,
						AttachmentId: tAttachmentId,
					};

    			this.addMail(tMail, 'Sent');
	   		});
			}
    });
  }

  addMail(pMail, pBox) {
  	if(pBox === 'Inbox') {
  		const currentMails = this.state.inbox;
  		const newMails = currentMails.concat(pMail);
	  	this.setState({
	  		inbox: newMails
	  	});
	  } else if(pBox === 'Sent') {
	  	const currentMails = this.state.sent;
  		const newMails = currentMails.concat(pMail);
	  	this.setState({
	  		sent: newMails
	  	});
	  }
  }

  handleButtonSelect(event) {
		event.preventDefault();
		this.setState({
			buttonActive: event.target.value,
		});
  }

  handleDialogToggle() {
    this.setState({dialogActive: !this.state.dialogActive});
  }

  actions = [{
    label: 'Exit',
    onClick: this.handleDialogToggle
  }];

	RenderUserFeed = () => {
		const boxSelect 	= this.handleButtonSelect;
		const buttons 		= this.state.buttons.split(" ");
		const activeButton = this.state.buttonActive;
		var mailSnippets = null;
		var mail;
		/*		        	
		if(this.state.inbox.length > 0) {
			var payloadLength = this.state.inbox[2].Payload.length;
			console.log(payloadLength);
			var html = this.state.inbox[2].Payload[payloadLength - 1];
			mail = <div dangerouslySetInnerHTML={{__html: html}}></div>;
		}
		*/

		// Render the mail box buttons
		const renderButtons = buttons.map(function(button){
			if (activeButton === button)
				return <Button className="mail-box-active" label={button} key={button} value={button} onClick={boxSelect} flat />	
			else 
				return <Button className="mail-box" label={button} key={button} value={button} onClick={boxSelect} flat />	
		});

		// Render the mails in the current box
		if(activeButton === 'Inbox') {
			mailSnippets = this.state.inbox.map(function(mail) {
					return <MailSnippet key={mail.Id}
															box="Inbox"
															snippet={mail.Snippet}
															date={mail.Date.value}
															from={mail.From.value} />;
				});
		} else if(activeButton === 'Sent') {
			mailSnippets = this.state.sent.map(function(mail) {
				return <MailSnippet key={mail.Id}
														box="Sent"
														snippet={mail.Snippet}
														date={mail.Date.value}
														from={mail.To.value} />;
			
			});
		}
		// Render the dialog with the mail being slected
		var dialog = 	<Dialog actions={this.actions} active={this.state.dialogActive} title='My awesome dialog' type="small">
				          	<p>Here you can add arbitrary content. Components like Pickers are using dialogs now.</p>
				        	</Dialog>;

		return (
			<div className="userpage-center-content">
				<div className="mail-boxes">
					{renderButtons}
				</div>
				<div className="mail-content">
					{mailSnippets}
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