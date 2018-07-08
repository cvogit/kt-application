import React, { Component } from 'react';

import Tab 	from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

import Banner 				from '../commons/Banner';
import ManageStudents from './manager/ManageStudents';
import ManageUsers 		from './manager/ManageUsers';

import '../../css/content/managerPage.css';

class ManagerPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			managerResources: null,
			managerPageIndex: 0,
		};
		this.handleFixedTabChange = this.handleFixedTabChange.bind(this);
	}

	componentWillMount() {
		const resources 	= this.props.resources;

		this.setState({
			managerResources: 	resources,
		});
	}

	handleFixedTabChange(index) {
		this.setState({
			managerPageIndex: index
		});
	}

	RenderManagerPage = () => {
		
		const managerPageIndex = this.state.managerPageIndex;
		var managerPageCenter = null;

		console.log(this.state.managerResources);

		if(managerPageIndex === 0) {
			managerPageCenter = <ManageUsers 	folder={this.state.managerResources.managerFolder} 
																				users={this.state.managerResources.managerUserList} 
																				newUsers={this.state.managerResources.managerNewUserList} 
																				/>
		} else if(managerPageIndex === 1) {
			managerPageCenter = <ManageStudents resource={this.state.managerResources} />
		} 

		return (
			<div className="manager-page-container">
				<Banner alt="banner-icon" />
				<div className="manager-page-content">
					<div className="manager-page-navigation-content">
		 				<Tabs index={managerPageIndex} onChange={this.handleFixedTabChange} fixed>
		          <Tab label='Users'></Tab>
		          <Tab label='Students'></Tab>
		        </Tabs>
					</div>
					{managerPageCenter}
				</div>
			</div>
			);
	}

	render() {	
		return (
			<this.RenderManagerPage />
		);
	}
}


export default ManagerPage;