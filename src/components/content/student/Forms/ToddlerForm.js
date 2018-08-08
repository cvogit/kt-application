import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input  from 'react-toolbox/lib/input/Input';

import FormItem 		from './FormItem';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class ToddlerForm extends Component { 
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
			question_12: null,
			question_13: null,
			question_14: null,
			question_15: null,
			question_16: null,
			question_17: null,
			question_18: null,
			question_19: null,
			question_20: null,
			question_21: null,
			question_22: null
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
			question_10: form.question_10,
			question_11: form.question_11,
			question_12: form.question_12,
			question_13: form.question_13,
			question_14: form.question_14,
			question_15: form.question_15,
			question_16: form.question_16,
			question_17: form.question_17,
			question_18: form.question_18,
			question_19: form.question_19,
			question_20: form.question_20,
			question_21: form.question_21,
			question_22: form.question_22
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
		ipcRenderer.send('updateToddlerFormRequest',
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
			this.state.question_12, 
			this.state.question_13, 
			this.state.question_14, 
			this.state.question_15, 
			this.state.question_16, 
			this.state.question_17, 
			this.state.question_18, 
			this.state.question_19,
			this.state.question_20,
			this.state.question_21, 
			this.state.question_22
		 );
		this.setState({
    	formEditDialog: false,
    });
	}

	RenderToddlerForm = () => {

		const form = this.props.form[0];

		return (
	<div className="form">
		<Button className="form-update-button" icon='brightness_low' label='Update form' onClick={this.handleOpenFormDialog} accent primary />
      	<Dialog className="form-update-dialog" active={this.state.formEditDialog} type="large" onOverlayClick={this.handleDialogExit}>
					<Input type='text' label='Breast feeding period' value={this.state.question_1} onChange={this.handleFormInputChange.bind(this, 'question_1')} maxLength={64} />
					<Input className="toolbox-textarea" label="Breast feeding difficulties" type='text' multiline rows={4} value={this.state.question_2} onChange={this.handleFormInputChange.bind(this, 'question_2')} maxLength={65535} />
					<Input className="toolbox-textarea" label="Vomiting and complications related to the digestive system" type='text' multiline rows={4} value={this.state.question_3} onChange={this.handleFormInputChange.bind(this, 'question_3')} maxLength={65535} />
					<Input className="toolbox-textarea" label="Constipation or diarrhea" type='text' multiline rows={4} value={this.state.question_4} onChange={this.handleFormInputChange.bind(this, 'question_4')} maxLength={65535} />
					<Input className="toolbox-textarea" label="Children cry a lot or quietly scary" type='text' multiline rows={4} value={this.state.question_5} onChange={this.handleFormInputChange.bind(this, 'question_5')} maxLength={65535} />
					<Input type='text' label='The first time the baby smile' value={this.state.question_6} onChange={this.handleFormInputChange.bind(this, 'question_6')} maxLength={64} />
					<Input type='text' label='The first time the baby look at objects' value={this.state.question_7} onChange={this.handleFormInputChange.bind(this, 'question_7')} maxLength={64} />
					<Input type='text' label='The first time the baby turns to look at the source of a sound' value={this.state.question_8} onChange={this.handleFormInputChange.bind(this, 'question_8')} maxLength={64} />
					<Input type='text' label='The first time the baby hold on to objects' value={this.state.question_9} onChange={this.handleFormInputChange.bind(this, 'question_9')} maxLength={64} />
					<Input type='text' label='The first time the baby starts to raise their head' value={this.state.question_10} onChange={this.handleFormInputChange.bind(this, 'question_10')} maxLength={64} />
					<Input type='text' label='The first time the baby crawl' value={this.state.question_11} onChange={this.handleFormInputChange.bind(this, 'question_11')} maxLength={64} />
					<Input type='text' label='The first time the baby sit up' value={this.state.question_12} onChange={this.handleFormInputChange.bind(this, 'question_12')} maxLength={64} />
					<Input type='text' label='The first time the baby stand up' value={this.state.question_13} onChange={this.handleFormInputChange.bind(this, 'question_13')} maxLength={64} />
					<Input type='text' label='The first time the baby walk' value={this.state.question_14} onChange={this.handleFormInputChange.bind(this, 'question_14')} maxLength={64} />
					<Input type='text' label='The first time the baby start to speak' value={this.state.question_15} onChange={this.handleFormInputChange.bind(this, 'question_15')} maxLength={64} />
					<Input type='text' label='The first time the baby form a sentence' value={this.state.question_16} onChange={this.handleFormInputChange.bind(this, 'question_16')} maxLength={64} />
					<Input type='text' label='The first time the baby refer to themself' value={this.state.question_17} onChange={this.handleFormInputChange.bind(this, 'question_17')} maxLength={64} />
					<Input type='text' label='The first time the baby grow teeth' value={this.state.question_18} onChange={this.handleFormInputChange.bind(this, 'question_18')} maxLength={64} />
					<Input type='text' label='The last time the baby have toilet accidents' value={this.state.question_19} onChange={this.handleFormInputChange.bind(this, 'question_19')} maxLength={64} />
					<Input type='text' label='The child shake oddly' value={this.state.question_20} onChange={this.handleFormInputChange.bind(this, 'question_20')} maxLength={64} />
					<Checkbox label="The child have their immunization shots" checked={this.state.question_21} onChange={this.handleFormCheckBoxChange.bind(this, 'question_21')} />
					<Input className="toolbox-textarea" label="Reactions to immunization shots" type='text' multiline rows={4} value={this.state.question_22} onChange={this.handleFormInputChange.bind(this, 'question_22')} maxLength={65535} />

			   <Button icon='add' label='Submit' onClick={this.handleUpdateFormRequest} raised primary />
      	</Dialog>
	  <div className="form-name">
	  	DEVELOPMENT PERIOD
	  </div>
		<FormItem question="Breast feeding period" respond={form.question_1} />
		<FormItem question="Breast feeding difficulties" respond={form.question_2} />
		<FormItem question="Vomiting and complications related to the digestive system" respond={form.question_3} />
		<FormItem question="Constipation or diarrhea" respond={form.question_4} />
		<FormItem question="Children cry a lot or quietly scary" respond={form.question_5} />
		<FormItem question="The first time the baby smile" respond={form.question_6} />
		<FormItem question="The first time the baby look at objects" respond={form.question_7} />
		<FormItem question="The first time the baby turns to look at the source of a sound" respond={form.question_8} />
		<FormItem question="The first time the baby hold on to objects" respond={form.question_9} />
		<FormItem question="The first time the baby starts to raise their head" respond={form.question_10} />
		<FormItem question="The first time the baby crawl" respond={form.question_11} />
		<FormItem question="The first time the baby sit up" respond={form.question_12} />
		<FormItem question="The first time the baby stand up" respond={form.question_13} />
		<FormItem question="The first time the baby walk" respond={form.question_14} />
		<FormItem question="The first time the baby start to speak" respond={form.question_15} />
		<FormItem question="The first time the baby form a sentence" respond={form.question_16} />
		<FormItem question="The first time the baby refer to themself" respond={form.question_17} />
		<FormItem question="The first time the baby grow teeth" respond={form.question_18} />
		<FormItem question="The last time the baby have toilet accidents" respond={form.question_19} />
		<FormItem question="The child shake oddly" respond={form.question_20} />
		<FormItem question="The child have their immunization shots" type="boolean" respond={form.question_21} />
		<FormItem question="Reactions to immunization shots" respond={form.question_22} />   	
	</div>
			);
	}

	render() {	

		return (
			<this.RenderToddlerForm />
			);
	}

}

export default ToddlerForm;