import React, { Component } from 'react';

import Tab 	from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

import Banner 				from '../commons/Banner';
import ManageStudents 	from './managerpage/ManageStudents';
import ManageEmployees 	from './managerpage/ManageEmployees';

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

	componentDidMount() {
		this.setState({
			managerResources: this.props.resources,
		});
	}

	handleFixedTabChange(index) {
		this.setState({
			managerPageIndex: index
		});
	}

	RenderManagerPage = () => {
		const managerResources = this.state.managerResources;
		const managerPageIndex = this.state.managerPageIndex;
		var managerPageCenter = null;

		if(managerPageIndex === 0 && managerResources) {
			managerPageCenter = <ManageEmployees 	folder={managerResources.managerFolder} 
																						users={managerResources.managerUserList} 
																						newUsers={managerResources.managerNewUserList}
																						students={managerResources.managerStudentList} 
																						/>
		} else if(managerPageIndex === 1 && managerResources) {
			managerPageCenter = <ManageStudents folder={managerResources.managerFolder} 
																					students={managerResources.managerStudentList} 
																					inactiveStudents={managerResources.managerInactiveStudentList} 
																					/>
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