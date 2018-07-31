import React, { Component } from 'react';

import EmployeeInfo 		from './EmployeeInfo';
import EmployeeReports 	from './EmployeeReports';

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
		console.log(employee);

		if(employee !== null) {
			// TODO = verifies with client about reports owner and updater display in employee page
			/*
			if(employeePageIndex === 0) {
				employeePageCenter = <EmployeeReports reports={employee.reports} />
			} else 
			*/

			if(employeePageIndex === 0) {
				employeePageCenter = <EmployeeInfo user={employee} />
			} 
		}

		return (
			<div className="employee-content" >
				<Tabs className="employee-tabs" index={employeePageIndex} onChange={this.handleFixedTabChange} fixed>
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