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
		this.getGoogleMail			= this.getGoogleMail.bind(this);
		this.addMail						= this.addMail.bind(this);

		this.handleDialogExit		= this.handleDialogExit.bind(this);
		this.handleButtonSelect = this.handleButtonSelect.bind(this);
		this.handleMailClick 		= this.handleMailClick.bind(this);
		this.handlePageClick 		= this.handlePageClick.bind(this);
	}

	componentWillMount() {
		this.getGoogleMail(15, this.state.nextInboxPageToken, 'Inbox');
		this.getGoogleMail(15, this.state.nextSentPageToken, 'Sent');
	}

	getGoogleMail(pMaxResult = 10, nextPageToken = null, pBox = 'Inbox') {
		var tBox;
		if(pBox  === 'Inbox') {
			tBox = 'in:inbox';
		} else if(pBox  === 'Sent') {
			tBox = 'in:sent';
		}

		var request = gapi.client.gmail.users.messages.list({
	    'userId': 'me',
	    'maxResults': pMaxResult,
	    'q': tBox,
	    'pageToken': nextPageToken,
	  });

	  request.execute((response) => {
	  	// Set variables and state
	  	var tGMailId = response.messages;
	  	this.state.total += tGMailId.length;
	  	this.state.nextInboxPageToken = response.nextPageToken;


	   	for( var i = 0; i < tGMailId.length; i++) {
				var tRequest = gapi.client.gmail.users.messages.get({
			    'userId': 'me',
			    'id': tGMailId[i].id,
			  });

				tRequest.execute((response) => { 
					var tMessageArray = [];
					var tAttachmentId = [];
					var tPayload = response.payload;

					if(tPayload) {
						if(tPayload.body.size === 0) {
							tPayload.parts.forEach(function(part) {
								if(part.body.size !== 0) {
									if(part.body.data) {
										var tMessage = atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
								  	tMessageArray.push(tMessage);
								  } else if (part.body.attachmentId) {
								  	tAttachmentId.push(part.body.attachmentId);
								  }
							  }
							});
						} else {
							if(tPayload.body.data) {
								var tMessage = atob(tPayload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
						  	tMessageArray.push(tMessage);
						  } else if (tPayload.body.attachmentId) {
						  	tAttachmentId.push(tPayload.body.attachmentId);
						  }
						}
						
					}

					var tMail;
					if(pBox  === 'Inbox') {
						tMail = {
							Id: this.state.inbox.length,
							From: response.payload.headers.find( header => header.name === 'From' ),
							Subject: response.payload.headers.find( header => header.name === 'Subject' ),
							Snippet: response.snippet,
							InternalDate: response.internalDate,
							Date: response.payload.headers.find( header => header.name === 'Date' ),
							Payload: tMessageArray,
							AttachmentId: tAttachmentId,
						};

	    			this.addMail(tMail, 'Inbox');
					} else if(pBox  === 'Sent') {
						tMail = {
							Id: this.state.sent.length,
							To: response.payload.headers.find( header => header.name === 'To' ),
							Subject: response.payload.headers.find( header => header.name === 'Subject' ),
							Snippet: response.snippet,
							InternalDate: response.internalDate,
							Date: response.payload.headers.find( header => header.name === 'Date' ),
							Payload: tMessageArray,
							AttachmentId: tAttachmentId,
						};

	    			this.addMail(tMail, 'Sent');
					}
	   		});
			}
    });
  }

  addMail(pMail, pBox) {
  	if(pBox === 'Inbox') {
  		const currentMails = this.state.inbox;
  		var newMails = currentMails.concat(pMail);
  		newMails.sort(function(a,b){return b.InternalDate - a.InternalDate});
	  	this.setState({
	  		inbox: newMails
	  	});
	  } else if(pBox === 'Sent') {
	  	const currentMails = this.state.sent;
  		var newMails = currentMails.concat(pMail);
  		newMails.sort(function(a,b){return b.InternalDate - a.InternalDate});
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

  handleDialogExit() {
    this.setState({
    	dialogActive: false,
    });
  }

  handleMailClick(pDialogContent) {
  	this.setState({
  		dialogActive: true,
  		dialogContent: pDialogContent,
  	});
  }

  handlePageClick(event) {
		this.setState({
			selected: event.selected,
		});
  };

	RenderUserFeed = () => {
		const boxSelect 	= this.handleButtonSelect;
		const buttons 		= this.state.buttons.split(" ");
		const activeButton = this.state.buttonActive;

		// Variable render the mail snippets
		var mailSnippets = null;
		var currentPageSnippets = null;

		// Variable to render the pagination
		const count 			= this.state.offset;

		// Render the mail box buttons
		const renderButtons = buttons.map(function(button){
			if (activeButton === button)
				return <Button className="mail-box-active" label={button} key={button} value={button} onClick={boxSelect} flat />	
			else 
				return <Button className="mail-box" label={button} key={button} value={button} onClick={boxSelect} flat />	
		});

		// Render the mails in the current box
		if(activeButton === 'Inbox') {
			mailSnippets = this.state.inbox.map((mail) => {
				const tPayload = mail.Payload[mail.Payload.length - 1];
				return <MailSnippet key={mail.Id}
														content={tPayload}
														snippet={mail.Snippet}
														date={mail.InternalDate}
														from={mail.From.value}
														onClick={this.handleMailClick} />;
			});
		} else if(activeButton === 'Sent') {
			mailSnippets = this.state.sent.map((mail) => {
				const tPayload = mail.Payload[mail.Payload.length - 1];
				return <MailSnippet key={mail.Id}
														content={tPayload}
														snippet={mail.Snippet}
														date={mail.InternalDate}
														from={mail.To.value}
														onClick={this.handleMailClick} />;
			
			});
		}

		const actions = [{
	    label: 'Exit',
	    onClick: this.handleDialogExit
	  }];

		// Render the dialog with the mail being slected
		var dialog = 	<Dialog className="dialog-container" actions={actions} active={this.state.dialogActive} type="normal">
				          	<div dangerouslySetInnerHTML={{__html: this.state.dialogContent}}></div>
				        	</Dialog>;

		return (
			<div className="userpage-center-content">
				{dialog}
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