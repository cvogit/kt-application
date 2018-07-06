import React, { Component } from 'react';

import EmployeeInfo from './EmployeeInfo';
import EmployeeStudents from './EmployeeStudents';
import EmployeeReports from './EmployeeReports';

import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

class EmployeeContent extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			EmployeepageIndex: 0,
		};
		this.handleFixedTabChange = this.handleFixedTabChange.bind(this);
	}

	handleFixedTabChange(index) {
		this.setState({
			employeePageIndex: index
		});
	}


	RenderManageEmployees = () => {
		var employeePageCenter = <EmployeeReports employee={this.props.employee} />;
		const employeePageIndex = this.state.employeePageIndex;

		if(employeePageIndex === 0) {
			employeePageCenter = <EmployeeReports employee={this.props.employee} />
		} else if(employeePageIndex === 1) {
			employeePageCenter = <EmployeeStudents />
		} else if(employeePageIndex === 2) {
			employeePageCenter = <EmployeeInfo />
		} 

		return (
			<div className="employee-content" >
				<Tabs index={employeePageIndex} onChange={this.handleFixedTabChange} fixed>
					<Tab label='Reports'></Tab>
					<Tab label='Students'></Tab>
					<Tab label='Info'></Tab>
				</Tabs>
				{employeePageCenter}
      </div>
			);
	}

	render() {	

		return (
			<this.RenderManageEmployees />
			);
	}
}

export default EmployeeContent;