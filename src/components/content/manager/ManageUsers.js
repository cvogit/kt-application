import React, { Component } from 'react';

import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';

import defaultAvatar from '../../../images/default_avatar.png';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class ManageUsers extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentDidMount() {
	}

	RenderManageUsers = () => {
		const resource = this.props.resource;
		var renderUserList;

		var userList = resource.UserList;
		
		if(userList.length === 0) {
			renderUserList = null;
		} else {
     	renderUserList = userList.map( (user) => {
				return <ListItem 	key={user.id}
													avatar={user.imagePath + user.avatarId}
								          caption={user.firstName + ' ' + user.lastName}
								          rightIcon='star' />
			});		
		}

		return (
			<div className="manage-user-content">
				<div className="manage-teacher-content">
					<List selectable ripple>
		        <ListSubHeader caption='Explore characters' />
		        {renderUserList}
	        </List>
				</div>
			</div>
			);
	}

	render() {	
		return (
			<this.RenderManageUsers />
			);
	}
}


export default ManageUsers;