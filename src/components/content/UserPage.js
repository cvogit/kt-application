import React, { Component } from 'react';
import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

import Banner 				from '../commons/Banner';
import UserPictures 	from './userpage/UserPictures';
import UserEdit 			from './userpage/UserEdit';

import '../../assets/react-toolbox/theme.css';
import '../../css/content/userPage.css';
import defaultAvatar from '../../images/default_avatar.png';

class UserPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatar          : null,
			userResources		: null,
			userpageIndex   : 0,
		};
		
		this.handleFixedTabChange = this.handleFixedTabChange.bind(this);
	}

	componentWillMount() {
		const resources 	= this.props.resources;
		var tAvatar 			= this.props.resources.avatar;
		if(tAvatar === null)
			tAvatar = defaultAvatar;

		this.setState({
			avatar: tAvatar,
			userResources: 	resources,
		});
	}

	handleFixedTabChange(index) {
		this.setState({
			userpageIndex: index
		});
	}
	
	RenderUserPage = () => {
		var avatarImage 		= this.state.avatar;
		var userpageIndex 	= this.state.userpageIndex;

		var userName 	= this.state.userResources.userInfo.firstName + " " + this.state.userResources.userInfo.lastName;
		var userPhone =	this.state.userResources.userInfo.phoneNum;

		var userpageCenter;

		if(userpageIndex === 0) {
			userpageCenter = <UserEdit user={this.state.userResources.userInfo} />
		} else if(userpageIndex === 1) {
			userpageCenter = <UserPictures />
		} 

		return (
			<div className="userpage-container">
				<Banner alt="banner-icon" />
				<div className="userpage-content">
					<div className="userpage-header">
						<div className="upper-header">
							<div className="userpage-avatar-container">
								<div className="userpage-avatar-box">
									<div className="userpage-avatar-box-bottom">
										<img className="avatar" src={avatarImage} alt="user-avatar"/>
									</div>
								</div>
							</div>
							<div className="user-info-container">
								<h4> {userName} </h4>
								<h5> {userPhone} </h5>
							</div>
						</div>
						<div className="userpage-navigation-container">
							<div className="userpage-navigation-content">
				 				<Tabs index={userpageIndex} onChange={this.handleFixedTabChange} fixed>
				          <Tab label='Info'></Tab>
				          <Tab label='Pictures'></Tab>
				        </Tabs>
							</div>
						</div>
					</div>
					{userpageCenter}
				</div>
			</div>
			);
	}

	render() {	
		return (
			<this.RenderUserPage />
			);
	}
}


export default UserPage;