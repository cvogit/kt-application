import React, { Component } from 'react';

import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';

import EmployeeContent 	from './Employee/EmployeeContent';
import NewEmployee 			from './Employee/NewEmployee';

import defaultAvatar from '../../../images/default_avatar.png';

class ManageUsers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listClicked: null,
			userIndex: 	 null,
		};

		this.renderNewUserContent = this.renderNewUserContent.bind(this);
		this.renderUserContent 		= this.renderUserContent.bind(this);
	}

	renderNewUserContent(newUserIndex) {
		this.setState({
			listClicked: 'newUser',
			userIndex: 	 newUserIndex,
		});
	}

	renderUserContent(userIndex) {
		this.setState({
			listClicked: 'user',
			userIndex: 	 userIndex,
		});
	}

	RenderManageUsers = () => {
		var renderUserList;
		var renderNewUserList;
		var renderUserContent;

		var userList 		= this.props.users;
		var newUserList = this.props.newUsers;
		const managerFolder = this.props.folder;

		// Render a list of active users
		if(userList.length === 0) {
			renderUserList = null;
		} else {
     	renderUserList = userList.map( (user, index) => {
     		var avatarPath = defaultAvatar;
     		if(user.avatarId !== 0) {
     			avatarPath = managerFolder + '/users/' + user.lastName + '_' + user.firstName + '_' + user.id +  '/images/image_' + user.avatarId;
     		}

				return <ListItem 	className="user-wrapper"
													label={user.id}
													key={user.id}
													avatar={avatarPath}
								          caption={user.lastName + ' ' + user.firstName}
								          rightIcon={user.newReports}
								          onClick={() => this.renderUserContent(index)} />
			});		
		}

		// Rendera  list of new users
		if(newUserList.length === 0) {
			renderNewUserList = null;
		} else {
     	renderNewUserList = newUserList.map( (user, index) => {
				return <ListItem 	className="user-wrapper"
													label={user.id}
													key={user.id}
													avatar={defaultAvatar}
								          caption={user.lastName + ' ' + user.firstName}
								          onClick={() => this.renderNewUserContent(index)} />
			});		
		}

		// Render the current select user information
		if(this.state.listClicked && (this.state.userIndex !== null)) {
			if(this.state.listClicked === 'user') {
				renderUserContent = <EmployeeContent employee={userList[this.state.userIndex]} students={this.props.students} />
			} else if (this.state.listClicked === 'newUser') {
				renderUserContent = <NewEmployee employee={newUserList[this.state.userIndex]} />
			}
		} else 
			renderUserContent = null;

		return (
			<div className="manage-user-container">
				<div className="manage-user-content">
					<List selectable ripple className="user-list">
		        <ListSubHeader caption='Employees' />
		        {renderUserList}
		        <ListSubHeader caption='New' />
		        {renderNewUserList}
	        </List>
	        {renderUserContent}
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