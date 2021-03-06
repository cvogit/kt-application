import React, { Component } from 'react';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

class EmployeeInfo extends Component { 
	constructor(props) {
		super(props);

	}

	RenderEmployeeInfo = () => {

		return (
			<div className="employee-info-container" >
				<div className="user-profile-container">
					<div className="gray-banner-sm" />
					<div className="user-profile-content">
						<div className="info-container">
							<h5 className="info-title">Email: </h5>
							<h5 className="info-field"> {this.props.user.email} </h5>
						</div>
						<div className="info-container">
							<h5 className="info-title">Phone: </h5>
							<h5 className="info-field"> {this.props.user.phoneNum} </h5>
						</div>
					</div>
				</div>
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