import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input  from 'react-toolbox/lib/input/Input';

import FormItem 		from './FormItem';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class FamilyForm extends Component { 
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
			question_10: null,
			question_11: null,
			question_12: null,

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
			question_6: form.question_6,
			question_7: form.question_7,
			question_8: form.question_8,
			question_9: form.question_9,
			question_10: form.question_10,
			question_11: form.question_11,
			question_12: form.question_12
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
		ipcRenderer.send('updateFamilyFormRequest',
			this.props.formId,
			this.state.question_1, 
			this.state.question_2, 
			this.state.question_3, 
			this.state.question_4, 
			this.state.question_5, 
			this.state.question_6, 
			this.state.question_7, 
			this.state.question_8, 
			this.state.question_9,
			this.state.question_10, 
			this.state.question_11, 
			this.state.question_12
		 );
		this.setState({
    	formEditDialog: false,
    });
	}

	RenderFamilyForm = () => {
		const form = this.props.form[0];
		
		return (
      <div className="form">
      	<Button className="form-update-button" icon='brightness_low' label='Update form' onClick={this.handleOpenFormDialog} accent primary />
      	<Dialog className="form-update-dialog" active={this.state.formEditDialog} type="large" onOverlayClick={this.handleDialogExit}>
					<Input type='text' label='Mother Name' value={this.state.question_1} onChange={this.handleFormInputChange.bind(this, 'question_1')} maxLength={64} />
					<Input type='date' label='Mother Birthday' value={this.state.question_2} onChange={this.handleFormInputChange.bind(this, 'question_2')} />
					<Input type='text' label='Mother Occupation' value={this.state.question_3} onChange={this.handleFormInputChange.bind(this, 'question_3')} maxLength={64} />
					<Input type='text' label='Mother Nationality' value={this.state.question_4} onChange={this.handleFormInputChange.bind(this, 'question_4')} maxLength={64} />
					<Input type='text' label='Father Name' value={this.state.question_5} onChange={this.handleFormInputChange.bind(this, 'question_5')} maxLength={64} />
					<Input type='date' label='Father Birthday' value={this.state.question_6} onChange={this.handleFormInputChange.bind(this, 'question_6')} />
					<Input type='text' label='Father Occupation' value={this.state.question_7} onChange={this.handleFormInputChange.bind(this, 'question_7')} maxLength={64} />
					<Input type='text' label='Father Nationality' value={this.state.question_8} onChange={this.handleFormInputChange.bind(this, 'question_8')} maxLength={64} />
					<Input className="toolbox-textarea" type='text' multiline rows={8} type='text' label='Siblings (name, birthday, and gender)' value={this.state.question_9} onChange={this.handleFormInputChange.bind(this, 'question_9')} maxLength={65535} />
					<Checkbox label="Parents are together" checked={this.state.question_10} onChange={this.handleFormCheckBoxChange.bind(this, 'question_10')} />
					<Checkbox label="History of family illness" checked={this.state.question_11} onChange={this.handleFormCheckBoxChange.bind(this, 'question_11')} />
					<Input className="toolbox-textarea" type='text' multiline rows={8} type='text' label='Details of family illness' value={this.state.question_12} onChange={this.handleFormInputChange.bind(this, 'question_12')} maxLength={65535} />

			   <Button icon='add' label='Submit' onClick={this.handleUpdateFormRequest} raised primary />
      	</Dialog>
      	<div className="form-name">
					FAMILY INFORMATION
				</div>
      	<FormItem question="Mother Name" respond={form.question_1} />
      	<FormItem question="Mother Birthday" respond={form.question_2} />
      	<FormItem question="Mother Occupation" respond={form.question_3} />
      	<FormItem question="Mother Nationality" respond={form.question_4} />
      	<FormItem question="Father Name" respond={form.question_5} />
      	<FormItem question="Father Birthday" respond={form.question_6} />
      	<FormItem question="Father Occupation" respond={form.question_7} />
      	<FormItem question="Father Nationality" respond={form.question_8} />
      	<FormItem question="Siblings (name, birthday, and gender)" respond={form.question_9} />
      	<FormItem question="Parents are together" type="boolean" respond={form.question_10} />
      	<FormItem question="History of family illness" respond={form.question_11} />
      	<FormItem question="Details of family illness" respond={form.question_12} />
      </div>
			);
	}

	render() {	

		return (
			<this.RenderFamilyForm />
			);
	}

}

export default FamilyForm;