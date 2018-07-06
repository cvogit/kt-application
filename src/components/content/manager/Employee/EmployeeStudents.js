import React, { Component } from 'react';

import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

class EmployeeStudents extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			EmployeepageIndex: 0,
		};
	}

	RenderEmployeeStudents = () => {


		return (
			<div className="employee-students" >

      </div>
			);
	}

	render() {	

		return (
			<this.RenderEmployeeStudents />
			);
	}

}

export default EmployeeStudents;