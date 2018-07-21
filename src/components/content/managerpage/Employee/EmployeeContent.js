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
			EmployeePageIndex: 0,
		};
		this.handleFixedTabChange = this.handleFixedTabChange.bind(this);
	}

	handleFixedTabChange(index) {
		this.setState({
			EmployeePageIndex: index
		});
	}

	componentWillReceiveProps(props) {
    this.setState({ 
    	EmployeePageIndex: 0
    });
	}


	RenderManageEmployees = () => {
		var employeePageCenter = null;
		var employeePageIndex = this.state.EmployeePageIndex;
		var employee = this.props.employee;

		if(employee !== null) {
			if(employeePageIndex === 0) {
				employeePageCenter = <EmployeeReports 	reports={employee.reports} />
			} else if(employeePageIndex === 1) {
				employeePageCenter = <EmployeeStudents 	teacher={employee.teacher} students={this.props.students} />
			} else if(employeePageIndex === 2) {
				employeePageCenter = <EmployeeInfo />
			} 
		}

		return (
			<div className="employee-content" >
				<Tabs className="employee-tabs" index={employeePageIndex} onChange={this.handleFixedTabChange} fixed>
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