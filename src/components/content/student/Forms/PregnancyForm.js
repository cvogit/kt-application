import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input  from 'react-toolbox/lib/input/Input';

import FormItem 		from './FormItem';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class PregnancyForm extends Component { 
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
			question_13: null,
			question_14: null,
			question_15: null
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
			question_8: form.question_9,
			question_10: form.question_10,
			question_11: form.question_11,
			question_12: form.question_12,
			question_13: form.question_13,
			question_14: form.question_14,
			question_15: form.question_15
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
		ipcRenderer.send('updatePregnancyFormRequest',
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
			this.state.question_15
		 );
		this.setState({
    	formEditDialog: false,
    });
	}

	RenderPregnancyForm = () => {
		
		const form = this.props.form[0];
		
		return (
			<div className="form">
				<Button className="form-update-button" icon='brightness_low' label='Update form' onClick={this.handleOpenFormDialog} accent primary />
      	<Dialog className="form-update-dialog" active={this.state.formEditDialog} type="large" onOverlayClick={this.handleDialogExit}>
					<Input className="toolbox-textarea" label='Physical or mental stress during pregnancy' type='text' multiline rows={4} value={this.state.question_1} onChange={this.handleFormInputChange.bind(this, 'question_1')} maxLength={65535} />
					<Input className="toolbox-textarea" label='Special medical condition during pregnancy' type='text' multiline rows={4} value={this.state.question_2} onChange={this.handleFormInputChange.bind(this, 'question_2')} maxLength={65535} />
					<Checkbox label="Rubella" checked={this.state.question_3} onChange={this.handleFormCheckBoxChange.bind(this, 'question_3')} />
					<Checkbox label="Measles" checked={this.state.question_4} onChange={this.handleFormCheckBoxChange.bind(this, 'question_4')} />
					<Checkbox label="Hemorrhage" checked={this.state.question_5} onChange={this.handleFormCheckBoxChange.bind(this, 'question_5')} />
					<Checkbox label="Accidents" checked={this.state.question_6} onChange={this.handleFormCheckBoxChange.bind(this, 'question_6')} />
					<Checkbox label="Mental Breakdown" checked={this.state.question_7} onChange={this.handleFormCheckBoxChange.bind(this, 'question_7')} />
					<Checkbox label="Radiology Treatments" checked={this.state.question_8} onChange={this.handleFormCheckBoxChange.bind(this, 'question_8')} />
					<Checkbox label="Radiology Accidents" checked={this.state.question_9} onChange={this.handleFormCheckBoxChange.bind(this, 'question_9')} />
					<Checkbox label="Alcohol consumptions" checked={this.state.question_10} onChange={this.handleFormCheckBoxChange.bind(this, 'question_10')} />
					<Checkbox label="Tobacco consumptions" checked={this.state.question_11} onChange={this.handleFormCheckBoxChange.bind(this, 'question_11')} />
					<Input type='text' label='Other' value={this.state.question_12} onChange={this.handleFormInputChange.bind(this, 'question_12')} maxLength={65535} />
					<Input type='text' label='Exposure to chemicals or other harmful substances' value={this.state.question_13} onChange={this.handleFormInputChange.bind(this, 'question_13')} maxLength={65535} />
					<Input type='text' label='Favorite foods' value={this.state.question_14} onChange={this.handleFormInputChange.bind(this, 'question_14')} maxLength={65535} />
					<Input type='text' label='Other events during pregnancy' value={this.state.question_15} onChange={this.handleFormInputChange.bind(this, 'question_15')} maxLength={65535} />
				
			   <Button icon='add' label='Submit' onClick={this.handleUpdateFormRequest} raised primary />
      	</Dialog>
				<div className="form-name">
					PREGNANCY PERIOD
			  </div>
				<FormItem question="Physical or mental stress during pregnancy" respond={form.question_1} />
				<FormItem question="Special medical condition during pregnancy" respond={form.question_2} />
				<FormItem question="Rubella" type="boolean" respond={form.question_3} />
				<FormItem question="Measles" type="boolean" respond={form.question_4} />
				<FormItem question="Hemorrhage" type="boolean" respond={form.question_5} />
				<FormItem question="Accidents" type="boolean" respond={form.question_6} />
				<FormItem question="Mental Breakdown" type="boolean" respond={form.question_7} />
				<FormItem question="Radiology Treatments" type="boolean" respond={form.question_8} />
				<FormItem question="Radiology Accidents" type="boolean" respond={form.question_9} />
				<FormItem question="Alcohol consumptions" type="boolean" respond={form.question_10} />
				<FormItem question="Tobacco consumptions" type="boolean" respond={form.question_11} />
				<FormItem question="Other " respond={form.question_12} />
				<FormItem question="Exposure to chemicals or other harmful substances" respond={form.question_13} />
				<FormItem question="Favorite foods" respond={form.question_14} />
				<FormItem question="Other events during pregnancy" respond={form.question_15} />
			</div>
			);
	}

	render() {	

		return (
			<this.RenderPregnancyForm />
			);
	}

}

export default PregnancyForm;