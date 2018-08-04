import React, { Component } from 'react';

import FormItem 		from './FormItem';

class IllnessForm extends Component { 
	constructor(props) {
		super(props);
	}

	RenderIllnessForm = () => {
		
		const form = this.props.form[0];

		return (
			<div className="form">
				<div className="form-name">
					ILLNESS
			  </div>
				<FormItem question="Measles" type="boolean" respond={form.question_1} />
				<FormItem question="Chicken pox" type="boolean" respond={form.question_2} />
				<FormItem question="Pertussis" type="boolean" respond={form.question_3} />
				<FormItem question="Mumps" type="boolean" respond={form.question_4} />
				<FormItem question="Rubella" type="boolean" respond={form.question_5} />
				<FormItem question="Child polio" type="boolean" respond={form.question_6} />
				<FormItem question="Pink roses" type="boolean" respond={form.question_7} />
				<FormItem question="Leukemia" type="boolean" respond={form.question_8} />
				<FormItem question="Skin diseases" type="boolean" respond={form.question_9} />
				<FormItem question="Allergy" type="boolean" respond={form.question_10} />
				<FormItem question="Bronchitis/Pneumonia" type="boolean" respond={form.question_11} />
				<FormItem question="Ear infections" type="boolean" respond={form.question_12} />
				<FormItem question="Lao" type="boolean" respond={form.question_13} />
				<FormItem question="Digestive disorders" type="boolean" respond={form.question_14} />
				<FormItem question="Accident" type="boolean" respond={form.question_15} />
				<FormItem question="Other" respond={form.question_16} />
				<FormItem question="How old are the diseases?" type="boolean" respond={form.question_17} />
				<FormItem question="Does the child have a seizure (fever) when having a fever? At what age?" respond={form.question_18} />
				<FormItem question="Worries" type="boolean" respond={form.question_19} />
				<FormItem question="Fear and habits" type="boolean" respond={form.question_21} />
				<FormItem question="Sleep disorders" type="boolean" respond={form.question_22} />
				<FormItem question="Eating disorders" type="boolean" respond={form.question_23} />
				<FormItem question="Run away from home" type="boolean" respond={form.question_24} />
				<FormItem question="Stealing" type="boolean" respond={form.question_25} />
				<FormItem question="Other" respond={form.question_26} />
				<FormItem question="Children like and do not like to eat" respond={form.question_27} />
				<FormItem question="Does the child have a special diet?" respond={form.question_28} />
				<FormItem question="How do you treat family members and other children?" respond={form.question_29} />
				<FormItem question="How do children play and often play with toys?" respond={form.question_30} />
				<FormItem question="Does the child know to imitate?" respond={form.question_31} />
				<FormItem question="Does the child have an accident, shocks, or developmental disorder related to developmental delays or difficulties (defects) of the child?" respond={form.question_32} />
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