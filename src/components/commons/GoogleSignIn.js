import React from 'react';

import '../../css/commons/googlesignin.css';


/* global gapi */

class GoogleSignIn extends React.Component{

	constructor(props){
		super(props);
		this.onSignIn 	= this.onSignIn.bind(this);
		this.loadGoogleApi 	= this.loadGoogleApi.bind(this);
	}

	componentDidMount() {
		gapi.signin2.render('g-signin2', {
			'scope': 'profile email https://mail.google.com/',
			'width': 200,
			'height': 50,
			'longtitle': true,
			'theme': 'light',
			'onsuccess': this.onSignIn,
		});
	}


	onSignIn(googleUser) {
		// Load google apis
		this.loadGoogleApi();
		this.props.onGoogleSignIn(googleUser);
	}

	loadGoogleApi() {
		// Load client api
		gapi.load('client:auth2', function() {
			// Load gmail api
	    gapi.client.load('gmail', 'v1', function() {
	      
	    });
		});
	}

	RenderGoogleSignIn = () => {

		return (
			<div className="google-signin">
				<div id="g-signin2" data-onsuccess={this.onSignIn}></div>
			</div>
			);
	}

	render() {
		return(
			<this.RenderGoogleSignIn />
		)
	}


}

export default GoogleSignIn