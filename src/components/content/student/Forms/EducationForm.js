import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input  from 'react-toolbox/lib/input/Input';

import FormItem 		from './FormItem';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class EducationForm extends Component { 
	constructor(props) {
		super(props);this.state = {
			formEditDialog: false,
			question_1: null,
			question_2: null,
			question_3: null,
			question_4: null,
			question_5: null,
			question_6: null
		};

		this.handleOpenFormDialog 		= this.handleOpenFormDialog.bind(this);
		this.handleUpdateFormRequest 	= this.handleUpdateFormRequest.bind(this);
		this.handleDialogExit 				= this.handleDialogExit.bind(this);
	}

	componentDidMount() {
		const form = this.props.form[0];

		this.setState({
			question_1: form.question_1,
			question_2: form.question_2,
			question_3: form.question_3,
			question_4: form.question_4,
			question_5: form.question_5,
			question_6: form.question_6
		});
	}

	handleFormInputChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  handleFormCheckBoxChange = (field, value) => {
    this.setState({...this.state, [field]: value});
  };

	handleDialogExit() {
		this.setState({
    	formEditDialog: false,
    });
	}

  handleOpenFormDialog() {
    this.setState({
    	formEditDialog: true,
    });
	}

	handleUpdateFormRequest() {
		ipcRenderer.send('updateEducationFormRequest',
			this.props.formId,
			this.state.question_1, 
			this.state.question_2, 
			this.state.question_3, 
			this.state.question_4, 
			this.state.question_5, 
			this.state.question_6
		 );
		this.setState({
    	formEditDialog: false,
    });
	}

	RenderEducationForm = () => {

		const form = this.props.form[0];

		return (
			<div className="form">
				<Button className="form-update-button" icon='brightness_low' label='Update form' onClick={this.handleOpenFormDialog} accent primary />
      	<Dialog className="form-update-dialog" active={this.state.formEditDialog} type="large" onOverlayClick={this.handleDialogExit}>
					<Input className="toolbox-textarea" type='text' multiline rows={4} label='According to you, what is the cause of the defect in children?' value={this.state.question_1} onChange={this.handleFormInputChange.bind(this, 'question_1')} maxLength={65535} />
					<Input className="toolbox-textarea" type='text' multiline rows={4} label='Children are raised' value={this.state.question_2} onChange={this.handleFormInputChange.bind(this, 'question_2')} maxLength={65535} />
					<Input className="toolbox-textarea" type='text' multiline rows={4} label='Children are raised by' value={this.state.question_3} onChange={this.handleFormInputChange.bind(this, 'question_3')} maxLength={65535} />
					<Input className="toolbox-textarea" type='text' multiline rows={4} label='Is the child attending kindergarten or boarding school or center?' value={this.state.question_4} onChange={this.handleFormInputChange.bind(this, 'question_4')} maxLength={65535} />
					<Input className="toolbox-textarea" type='text' multiline rows={4} label="Does the child have a doctor's visit to a pediatrician for a particular reason? Result?" value={this.state.question_5} onChange={this.handleFormInputChange.bind(this, 'question_5')} maxLength={65535} />
					<Input className="toolbox-textarea" type='text' multiline rows={4} label='What medications did the child take? On time?' value={this.state.question_6} onChange={this.handleFormInputChange.bind(this, 'question_6')} maxLength={65535} />

			   <Button icon='add' label='Submit' onClick={this.handleUpdateFormRequest} raised primary />
      	</Dialog>
				<div className="form-name">
					EDUCATION AND TREATMENT FOR CHILDREN	
				</div>
				<FormItem question="According to you, what is the cause of the defect in children?" respond={form.question_1} />
				<FormItem question="Children are raised" respond={form.question_2} />
				<FormItem question="Children are raised by" respond={form.question_3} />
				<FormItem question="Is the child attending kindergarten or boarding school or center?" respond={form.question_4} />
				<FormItem question="Does the child have a doctor's visit to a pediatrician for a particular reason? Result?" respond={form.question_5} />
				<FormItem question="What medications did the child take? On time?" respond={form.question_6} /> />
			</div>
			);
	}

	render() {	

		return (
			<this.RenderEducationForm />
			);
	}

}

export default EducationForm;