import React, { Component } from 'react';

import List 		from 'react-toolbox/lib/list/List';
import ListItem from 'react-toolbox/lib/list/ListItem';
import ListSubHeader from 'react-toolbox/lib/list/ListSubHeader';

import defaultAvatar from '../../../images/default_avatar.png';

class TeacherContentManager extends Component {
	constructor(props) {
		super(props);
		this.state = {
			managers: [],
			managerIndex: 0,
			folder: null,
		};

		this.renderManagerContent = this.renderManagerContent.bind(this);
	}

	componentDidMount() {
		this.setState({
			managers: this.props.managers,
			folder: this.props.folder,
		})
	}

	renderManagerContent(managerIndex) {
		this.setState({
			managerIndex: managerIndex,
		});
	}

	RenderTeacherContentManager = () => {
		const teacherFolder = this.state.folder;
		var managerList = this.state.managers;
		var renderManagerList = null;

		// Render a list of managers
		if(managerList.length === 0) {
			renderManagerList = null;
		} else {
     	renderManagerList = managerList.map( (manager, index) => {
     		var avatarPath = defaultAvatar;
     		if(manager.avatarId !== 0) {
     			avatarPath = teacherFolder + '/managers/' + manager.lastName + '_' + manager.firstName + '_' + manager.id +  '/images/image_' + manager.avatarId;
     		}

				return <ListItem 	className="user-wrapper"
													label={manager.id}
													key={manager.id}
													avatar={avatarPath}
								          caption={manager.lastName + ' ' + manager.firstName}
								          onClick={() => this.renderManagerContent(index)} />
			});		
		}

		return (
			<div className="teacher-page-main">
				<div className="teacher-page-left">
					<List selectable ripple className="teacher-page-list">
			      <ListSubHeader caption='Managers' />
			      {renderManagerList}
			    </List>
			    <div className="teacher-page-list-bottom">
			    	
			    </div>
				</div>
				<div className="teacher-page-right">

				</div>
			</div>
			);
	}

	render() {	
		return (
			<this.RenderTeacherContentManager />
		);
	}
}


export default TeacherContentManager;