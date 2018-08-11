import React, { Component } from 'react';

import EmployeeInfo 		from './EmployeeInfo';
import EmployeeReports 	from './EmployeeReports';
import EmployeeRoles 		from './EmployeeRoles';


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

	static getDerivedStateFromProps(nextProps, prevState) {
	  if (nextProps.employee.id !== prevState.employee.id) {
	    return ({ EmployeePageIndex: 0 }) // <- this is setState equivalent
	  }
	}

	RenderManageEmployees = () => {
		var employeePageCenter = null;
		var employeePageIndex = this.state.EmployeePageIndex;
		var employee = this.props.employee;

		if(employee !== null) {

			if(employeePageIndex === 0) {
				employeePageCenter = <EmployeeInfo user={employee} />
			} else if(employeePageIndex === 1) {
				employeePageCenter = <EmployeeRoles user={employee} />
			}
		}

		return (
			<div className="employee-content" >
				<Tabs className="employee-tabs" index={employeePageIndex} onChange={this.handleFixedTabChange} fixed>
					<Tab label='Info' />
					<Tab label='Roles' />
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