import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input  from 'react-toolbox/lib/input/Input';

import FormItem 		from './FormItem';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class IllnessForm extends Component { 
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
			question_22: null,
			question_23: null,
			question_24: null,
			question_25: null,
			question_26: null,
			question_27: null,
			question_28: null,
			question_29: null,
			question_30: null,
			question_31: null
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
			question_22: form.question_22,
			question_23: form.question_23,
			question_24: form.question_24,
			question_25: form.question_25,
			question_26: form.question_26,
			question_27: form.question_27,
			question_28: form.question_28,
			question_29: form.question_29,
			question_30: form.question_30,
			question_31: form.question_31
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
		ipcRenderer.send('updateIllnessFormRequest',
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
			this.state.question_22, 
			this.state.question_23, 
			this.state.question_24, 
			this.state.question_25, 
			this.state.question_26, 
			this.state.question_27, 
			this.state.question_28, 
			this.state.question_29,
			this.state.question_30,
			this.state.question_31
		 );
		this.setState({
    	formEditDialog: false,
    });
	}

	RenderIllnessForm = () => {
		
		const form = this.props.form[0];

		return (
			<div className="form">
				<Button className="form-update-button" icon='brightness_low' label='Update form' onClick={this.handleOpenFormDialog} accent primary />
      	<Dialog className="form-update-dialog" active={this.state.formEditDialog} type="large" onOverlayClick={this.handleDialogExit}>
					<Checkbox label="Measles" checked={this.state.question_1} onChange={this.handleFormCheckBoxChange.bind(this, 'question_1')} />
					<Checkbox label="Chicken pox" checked={this.state.question_2} onChange={this.handleFormCheckBoxChange.bind(this, 'question_2')} />
					<Checkbox label="Pertussis" checked={this.state.question_3} onChange={this.handleFormCheckBoxChange.bind(this, 'question_3')} />
					<Checkbox label="Mumps" checked={this.state.question_4} onChange={this.handleFormCheckBoxChange.bind(this, 'question_4')} />
					<Checkbox label="Rubella" checked={this.state.question_4} onChange={this.handleFormCheckBoxChange.bind(this, 'question_5')} />
					<Checkbox label="Childhood polio" checked={this.state.question_6} onChange={this.handleFormCheckBoxChange.bind(this, 'question_6')} />
					<Checkbox label="Pink roses" checked={this.state.question_7} onChange={this.handleFormCheckBoxChange.bind(this, 'question_7')} />
					<Checkbox label="Leukemia" checked={this.state.question_7} onChange={this.handleFormCheckBoxChange.bind(this, 'question_8')} />
					<Checkbox label="Skin diseases" checked={this.state.question_9} onChange={this.handleFormCheckBoxChange.bind(this, 'question_9')} />
					<Checkbox label="Allergy" checked={this.state.question_10} onChange={this.handleFormCheckBoxChange.bind(this, 'question_10')} />
					<Checkbox label="Bronchitis/Pneumonia" checked={this.state.question_11} onChange={this.handleFormCheckBoxChange.bind(this, 'question_11')} />
					<Checkbox label="Ear infections" checked={this.state.question_12} onChange={this.handleFormCheckBoxChange.bind(this, 'question_12')} />
					<Checkbox label="Lao" checked={this.state.question_13} onChange={this.handleFormCheckBoxChange.bind(this, 'question_13')} />
					<Checkbox label="Digestive disorders" checked={this.state.question_14} onChange={this.handleFormCheckBoxChange.bind(this, 'question_14')} />
					<Checkbox label="Accident" checked={this.state.question_15} onChange={this.handleFormCheckBoxChange.bind(this, 'question_15')} />
					<Checkbox label="Other" checked={this.state.question_16} onChange={this.handleFormCheckBoxChange.bind(this, 'question_16')} />
					<Input className="toolbox-textarea" type='text' multiline rows={4} label='How old are the diseases?' value={this.state.question_17} onChange={this.handleFormInputChange.bind(this, 'question_17')} maxLength={65535} />
					<Input className="toolbox-textarea" type='text' multiline rows={4} label='Does the child have a seizure (fever) when having a fever? At what age?' value={this.state.question_18} onChange={this.handleFormInputChange.bind(this, 'question_18')} maxLength={65535} />
					<Checkbox label="Anxieties" checked={this.state.question_19} onChange={this.handleFormCheckBoxChange.bind(this, 'question_19')} />
					<Checkbox label="Fear and habits" checked={this.state.question_20} onChange={this.handleFormCheckBoxChange.bind(this, 'question_20')} />
					<Checkbox label="Sleep disorders" checked={this.state.question_21} onChange={this.handleFormCheckBoxChange.bind(this, 'question_21')} />
					<Checkbox label="Eating disorders" checked={this.state.question_22} onChange={this.handleFormCheckBoxChange.bind(this, 'question_22')} />
					<Checkbox label="Run away from home" checked={this.state.question_23} onChange={this.handleFormCheckBoxChange.bind(this, 'question_23')} />
					<Checkbox label="Stealing" checked={this.state.question_24} onChange={this.handleFormCheckBoxChange.bind(this, 'question_24')} />
					<Checkbox label="Other" checked={this.state.question_25} onChange={this.handleFormCheckBoxChange.bind(this, 'question_25')} />
					<Input className="toolbox-textarea" type='text' multiline rows={4} label='Children like and do not like to eat' value={this.state.question_26} onChange={this.handleFormInputChange.bind(this, 'question_26')} maxLength={65535} />
					<Input className="toolbox-textarea" type='text' multiline rows={4} label='Does the child have a special diet?' value={this.state.question_27} onChange={this.handleFormInputChange.bind(this, 'question_27')} maxLength={65535} />
					<Input className="toolbox-textarea" type='text' multiline rows={4} label='How do you treat family members and other children?' value={this.state.question_28} onChange={this.handleFormInputChange.bind(this, 'question_28')} maxLength={65535} />
					<Input className="toolbox-textarea" type='text' multiline rows={4} label='How do children play and often play with toys?' value={this.state.question_29} onChange={this.handleFormInputChange.bind(this, 'question_29')} maxLength={65535} />
					<Input className="toolbox-textarea" type='text' multiline rows={4} label='Does the child know to imitate?' value={this.state.question_30} onChange={this.handleFormInputChange.bind(this, 'question_30')} maxLength={65535} />
					<Input className="toolbox-textarea" type='text' multiline rows={4} label='Does the child have an accident, shocks, or developmental disorder related to developmental delays or difficulties (defects) of the child?' value={this.state.question_31} onChange={this.handleFormInputChange.bind(this, 'question_31')} maxLength={65535} />

			   <Button icon='add' label='Submit' onClick={this.handleUpdateFormRequest} raised primary />
      	</Dialog>
				<div className="form-name">
					ILLNESS
			  </div>
				<FormItem question="Measles" type="boolean" respond={form.question_1} />
				<FormItem question="Chicken pox" type="boolean" respond={form.question_2} />
				<FormItem question="Pertussis" type="boolean" respond={form.question_3} />
				<FormItem question="Mumps" type="boolean" respond={form.question_4} />
				<FormItem question="Rubella" type="boolean" respond={form.question_5} />
				<FormItem question="Childhood polio" type="boolean" respond={form.question_6} />
				<FormItem question="Pink roses" type="boolean" respond={form.question_7} />
				<FormItem question="Leukemia" type="boolean" respond={form.question_8} />
				<FormItem question="Skin diseases" type="boolean" respond={form.question_9} />
				<FormItem question="Allergy" type="boolean" respond={form.question_10} />
				<FormItem question="Bronchitis/Pneumonia" type="boolean" respond={form.question_11} />
				<FormItem question="Ear infections" type="boolean" respond={form.question_12} />
				<FormItem question="Lao" type="boolean" respond={form.question_13} />
				<FormItem question="Digestive disorders" type="boolean" respond={form.question_14} />
				<FormItem question="Accident" type="boolean" respond={form.question_15} />
				<FormItem question="Other" type="boolean" respond={form.question_16} />
				<FormItem question="How old are the diseases?" respond={form.question_17} />
				<FormItem question="Does the child have a seizure (fever) when having a fever? At what age?" respond={form.question_18} />
				<FormItem question="Anxieties" type="boolean" respond={form.question_19} />
				<FormItem question="Fear and habits" type="boolean" respond={form.question_20} />
				<FormItem question="Sleep disorders" type="boolean" respond={form.question_21} />
				<FormItem question="Eating disorders" type="boolean" respond={form.question_22} />
				<FormItem question="Run away from home" type="boolean" respond={form.question_23} />
				<FormItem question="Stealing" type="boolean" respond={form.question_24} />
				<FormItem question="Other" type="boolean" respond={form.question_25} />
				<FormItem question="Children like and do not like to eat" respond={form.question_26} />
				<FormItem question="Does the child have a special diet?" respond={form.question_27} />
				<FormItem question="How do you treat family members and other children?" respond={form.question_28} />
				<FormItem question="How do children play and often play with toys?" respond={form.question_29} />
				<FormItem question="Does the child know to imitate?" respond={form.question_30} />
				<FormItem question="Does the child have an accident, shocks, or developmental disorder related to developmental delays or difficulties (defects) of the child?" respond={form.question_31} />
			</div>
			);
	}

	render() {	

		return (
			<this.RenderIllnessForm />
			);
	}

}

export default IllnessForm;