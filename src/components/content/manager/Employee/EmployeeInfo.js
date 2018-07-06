import React, { Component } from 'react';

import Tab from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

class EmployeeInfo extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			EmployeepageIndex: 0,
		};
	}

	RenderEmployeeInfo = () => {


		return (
			<div className="employee-info" >

      </div>
			);
	}

	render() {	

		return (
			<this.RenderEmployeeInfo />
			);
	}

}

export default EmployeeInfo;