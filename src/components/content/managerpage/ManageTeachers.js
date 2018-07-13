import React, { Component } from 'react';

import List from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';

import defaultAvatar from '../../../images/default_avatar.png';


const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class ManageTeachers extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
	}

	RenderManageTeachers = () => {
		console.log(this.props.teachers);
		//var teacher = this.props.teachers[0];
		var name; //= teacher.firstName + " " + teacher.lastName;

		return (
			<div className="manage-teacher-content">
				<List selectable ripple>
	        <ListSubHeader caption='Explore characters' />
	        <ListItem
	          avatar='https://dl.dropboxusercontent.com/u/2247264/assets/m.jpg'
	          caption={name}
	          legend="Jonathan 'Jon' Osterman"
	          rightIcon='star'
	        />
        </List>
			</div>
			);
	}

	render() {	
		return (
			<this.RenderManageTeachers />
			);
	}
}


export default ManageTeachers;