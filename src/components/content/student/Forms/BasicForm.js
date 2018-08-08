import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input  from 'react-toolbox/lib/input/Input';

import FormItem 		from './FormItem';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class BasicForm extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			formEditDialog: false,
			question_1: null,
			question_2: null,
			question_3: null,
			question_4: null,
			question_5: null,
			question_6: null,
			question_7: null,
			question_8: null,
			question_9: null,
		};
		
		this.handleDialogExit 				= this.handleDialogExit.bind(this);
		this.handleOpenFormDialog 		= this.handleOpenFormDialog.bind(this);
		this.handleUpdateFormRequest 	= this.handleUpdateFormRequest.bind(this);
	}

	componentDidMount() {
		const form = this.props.form[0];

		this.setState({
			question_1: form.question_1,
			question_2: form.question_2,
			question_3: form.question_3,
			question_4: form.question_4,
			question_5: form.question_5,
			question_6: form.question_6,
			question_7: form.question_7,
			question_8: form.question_8,
			question_9: form.question_9,
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
		ipcRenderer.send('updateBasicFormRequest',
			this.props.formId,
			this.state.question_1, 
			this.state.question_2, 
			this.state.question_3, 
			this.state.question_4, 
			this.state.question_5, 
			this.state.question_6, 
			this.state.question_7, 
			this.state.question_8, 
			this.state.question_9
		 );
		this.setState({
    	formEditDialog: false,
    });
	}

	RenderBasicForm = () => {
		
		const form = this.props.form[0];
		
		return (
      <div className="form">
      	<Button className="form-update-button" icon='brightness_low' label='Update form' onClick={this.handleOpenFormDialog} accent primary />
      	<Dialog className="form-update-dialog" active={this.state.formEditDialog} type="large" onOverlayClick={this.handleDialogExit}>
					<Input type='text' label='Name' value={this.state.question_1} onChange={this.handleFormInputChange.bind(this, 'question_1')} maxLength={64} />
					<Input type='date' label='Birthday' value={this.state.question_2} onChange={this.handleFormInputChange.bind(this, 'question_2')} maxLength={64} />
					<Checkbox checked={this.state.question_3} label="Male" onChange={this.handleFormCheckBoxChange.bind(this, 'question_3')} />
					<Checkbox checked={this.state.question_4} label="Female" onChange={this.handleFormCheckBoxChange.bind(this, 'question_4')} />
					<Input type='text' label='Birth place' value={this.state.question_5} onChange={this.handleFormInputChange.bind(this, 'question_5')} maxLength={64} />
					<Input type='text' label='Address' value={this.state.question_6} onChange={this.handleFormInputChange.bind(this, 'question_6')} maxLength={64} />
					<Input type='text' label='Phone number 1' value={this.state.question_7} onChange={this.handleFormInputChange.bind(this, 'question_7')} maxLength={16} />
					<Input type='text' label='Phone number 2' value={this.state.question_8} onChange={this.handleFormInputChange.bind(this, 'question_8')} maxLength={16} />
					<Input type='text' label='Email' value={this.state.question_9} onChange={this.handleFormInputChange.bind(this, 'question_9')} maxLength={64} />

			   <Button icon='add' label='Submit' onClick={this.handleUpdateFormRequest} raised primary />
      	</Dialog>
	      <div className="form-name">
					BASIC INFORMATION
				</div>
      	<FormItem question="Name" respond={form.question_1} />
      	<FormItem question="Birthday" respond={form.question_2} />
      	<FormItem question="Male" type="boolean" respond={form.question_3} />
      	<FormItem question="Female" type="boolean" respond={form.question_4} />
      	<FormItem question="Birth place" respond={form.question_5} />
      	<FormItem question="Address" respond={form.question_6} />
      	<FormItem question="Phone number 1" respond={form.question_7} />
      	<FormItem question="Phone number 2" respond={form.question_8} />
      	<FormItem question="Email" respond={form.question_9} />
      </div>
			);
	}

	render() {	

		return (
			<this.RenderBasicForm />
			);
	}

}

export default BasicForm;