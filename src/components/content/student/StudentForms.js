import React, { Component } from 'react';

import Tab 	from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

import BasicForm 			from './Forms/BasicForm';
import PregnancyForm 	from './Forms/PregnancyForm';
import BirthForm 			from './Forms/BirthForm';
import InfancyForm 		from './Forms/InfancyForm';
import ToddlerForm 		from './Forms/ToddlerForm';
import FamilyForm 		from './Forms/FamilyForm';
import IllnessForm 		from './Forms/IllnessForm';
import EducationForm 	from './Forms/EducationForm';
import PresentForm 		from './Forms/PresentForm';

import '../../../css/forms.css';

class StudentForms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formIndex: 0,
		};
		this.handleFormChange = this.handleFormChange.bind(this);
	}

	handleFormChange(index) {
		this.setState({
    	formIndex: index,
    });
	}

	RenderStudentForm = () => {
		var form = null;
		const index 	= this.state.formIndex;
		const student = this.props.student;
		const forms  	= this.props.student.forms;

		if(index === 0) {
			form = <BasicForm form={forms.basicForm} formId={student.basicFormId} />;
		} else if(index === 1) {
			form = <PregnancyForm form={forms.pregnancyForm} formId={student.pregnancyFormId} />;
		} else if(index === 2) {
			form = <BirthForm form={forms.birthForm} formId={student.birthFormId} />;
		} else if(index === 3) {
			form = <InfancyForm form={forms.infancyForm} formId={student.infancyFormId} />;
		} else if(index === 4) {
			form = <ToddlerForm form={forms.toddlerForm} formId={student.toddlerFormId} />;
		} else if(index === 5) {
			form = <FamilyForm form={forms.familyForm} formId={student.familyFormId} />;
		} else if(index === 6) {
			form = <IllnessForm form={forms.illnessForm} formId={student.illnessFormId} />;
		} else if(index === 7) {
			form = <EducationForm form={forms.educationForm} formId={student.educationFormId} />;
		} else if(index === 8) {
			form = <PresentForm form={forms.presentForm} formId={student.presentFormId} />;
		} 

		return (
			<div className="student-forms-container">
				<Tabs className="forms-tabs" index={this.state.formIndex} onChange={this.handleFormChange} fixed>
					<Tab icon='filter_1'></Tab>
					<Tab icon='filter_2'></Tab>
					<Tab icon='filter_3'></Tab>
					<Tab icon='filter_4'></Tab>
					<Tab icon='filter_5'></Tab>
					<Tab icon='filter_6'></Tab>
					<Tab icon='filter_7'></Tab>
					<Tab icon='filter_8'></Tab>
					<Tab icon='filter_9'></Tab>
				</Tabs>
				{form}
			</div>
			);
	}

	render() {	
		return (
			<this.RenderStudentForm />
		);
	}
}


export default StudentForms;