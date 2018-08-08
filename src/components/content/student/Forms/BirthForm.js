import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input  from 'react-toolbox/lib/input/Input';

import FormItem 		from './FormItem';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class BirthForm extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			formEditDialog: false,
			question_1: null,
			question_2: null,
			question_3: null,
			question_4: null
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
			question_4: form.question_4
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
		ipcRenderer.send('updateBirthFormRequest',
			this.props.formId,
			this.state.question_1, 
			this.state.question_2, 
			this.state.question_3, 
			this.state.question_4
		 );
		this.setState({
    	formEditDialog: false,
    });
	}

	RenderBirthForm = () => {

		const form = this.props.form[0];
		
		return (
      <div className="form">
      	<Button className="form-update-button" icon='brightness_low' label='Update form' onClick={this.handleOpenFormDialog} accent primary />
      	<Dialog className="form-update-dialog" active={this.state.formEditDialog} type="large" onOverlayClick={this.handleDialogExit}>
					<Input type='text' label='Birth weight and time period' value={this.state.question_1} onChange={this.handleFormInputChange.bind(this, 'question_1')} maxLength={128} />
					<Input className="toolbox-textarea" type='text' multiline rows={4} label='Birth complications' value={this.state.question_2} onChange={this.handleFormInputChange.bind(this, 'question_2')} maxLength={65535} />
					<Input className="toolbox-textarea" type='text' multiline rows={4} label='Birth method' value={this.state.question_3} onChange={this.handleFormInputChange.bind(this, 'question_3')} maxLength={65535} />
					<Input className="toolbox-textarea" type='text' multiline rows={4} label='Others' value={this.state.question_4} onChange={this.handleFormInputChange.bind(this, 'question_4')} maxLength={65535} />

			   <Button icon='add' label='Submit' onClick={this.handleUpdateFormRequest} raised primary />
      	</Dialog>
      	<div className="form-name">
					BIRTH INFORMATION
				</div>
      	<FormItem question="Birth weight and time period" respond={form.question_1} />
      	<FormItem question="Birth complications" respond={form.question_2} />
      	<FormItem question="Birth method" respond={form.question_3} />
      	<FormItem question="Others"  respond={form.question_4} />
      </div>
			);
	}

	render() {	

		return (
			<this.RenderBirthForm />
			);
	}

}

export default BirthForm;