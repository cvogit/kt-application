import React from 'react';

import '../../css/commons/googlesignin.css';


/* global gapi */

class GoogleSignIn extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			signedIn: false,
		}
		this.onSignIn 	= this.onSignIn.bind(this);
	}

	componentDidMount() {
		gapi.signin2.render('g-signin2', {
			'scope': 'profile email',
			'width': 200,
			'height': 50,
			'longtitle': true,
			'theme': 'light',
			'onsuccess': this.onSignIn,
		});
	}

	onSignIn(googleUser) {
		this.props.onGoogleSignIn(googleUser);
		this.setState({signedIn: true });
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