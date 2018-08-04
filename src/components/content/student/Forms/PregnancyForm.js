import React, { Component } from 'react';

import FormItem 		from './FormItem';

class PregnancyForm extends Component { 
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	RenderPregnancyForm = () => {
		
		const form = this.props.form[0];
		
		return (
			<div className="form">
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
				<FormItem question="Radiology Treatments" type="boolean" type="boolean" respond={form.question_8} />
				<FormItem question="Radiology Treatments" type="boolean" type="boolean" respond={form.question_9} />
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