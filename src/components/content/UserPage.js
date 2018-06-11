import React, { Component } from 'react';
import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

import Banner 				from '../commons/Banner';
import UserFeed 			from './userpage/UserFeed';
import UserPictures 	from './userpage/UserPictures';
import UserHistory 		from './userpage/UserHistory';
import UserEdit 			from './userpage/UserEdit';
import UserSidebar 		from './userpage/UserSidebar';

import '../../assets/react-toolbox/theme.css';
import '../../css/content/userPage.css';
import fillerUserImage from '../../images/user.png';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class UserPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatar          : null,
			userFirstName		: null,
			userLastName		: null,
			userPhone 			: null,
			userpageIndex   : 0,
		};
		
		this.LoadUserAvatar 			= this.LoadUserAvatar.bind(this);
		this.handleActive 				= this.handleActive.bind(this);
		this.handleFixedTabChange = this.handleFixedTabChange.bind(this);
	}

	componentDidMount() {
		ipcRenderer.on('loadUserAvatar', this.LoadUserAvatar);
	}

	componentWillMount() {
		const resources = this.props.resources;
		
		this.setState({
			avatar: resources.avatar,
			userFirstName: 	resources.userInfo.firstName,
			userLastName: 	resources.userInfo.lastName,
			userPhone: 			resources.userInfo.phoneNum,
		});
	}

	LoadUserAvatar(event, avatar) {
		this.setState({
			avatar: avatar,
		});
	}

	handleActive(event) {

	}

	handleFixedTabChange(index) {
		this.setState({
			userpageIndex: index
		});
	}

	
	RenderUserPage = () => {
		var avatarImage 		= this.state.avatar;
		var userpageIndex 	= this.state.userpageIndex;
		var userpageSidebar = <UserSidebar 	firstName={this.state.userFirstName} 
																				lastName={this.state.userLastName} 
																				userPhone={this.state.userPhone} />;
		var userpageCenter;


		if(userpageIndex === 0) {
			userpageCenter = <UserFeed />
		} else if(userpageIndex === 1) {
			userpageCenter = <UserPictures />
		} else if(userpageIndex === 2) {
			userpageCenter = <UserHistory />
		} else if(userpageIndex === 3) {
			userpageCenter = <UserEdit />
		}

		return (
			<div className="userpage-container">
				<Banner alt="banner-icon" />
				<div className="userpage-content">
					<div className="userpage-header">
						<div className="userpage-avatar-container">
							<div className="userpage-avatar-box">
								<div className="userpage-avatar-box-bottom">
									<img className="avatar" src={avatarImage} alt="user-avatar"/>
								</div>
							</div>
						</div>
						<div className="userpage-navigation-container">
							<div className="userpage-navigation-content">
				 				<Tabs index={userpageIndex} onChange={this.handleFixedTabChange} fixed>
				          <Tab label='Feeds'></Tab>
				          <Tab label='Pictures'></Tab>
				          <Tab label='History'></Tab>
				          <Tab label='Edit'></Tab>
				        </Tabs>
							</div>
						</div>
					</div>

					{userpageSidebar}
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