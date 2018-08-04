import React, { Component } from 'react';

import FormItem 		from './FormItem';

class ToddlerForm extends Component { 
	constructor(props) {
		super(props);
	}

	RenderToddlerForm = () => {

		const form = this.props.form[0];

		return (
	<div className="form">
	  <div className="form-name">
	  	DEVELOPMENT PERIOD
	  </div>
		<FormItem question="Breast feed period" respond={form.question_1} />
		<FormItem question="Breast feed difficulties" respond={form.question_2} />
		<FormItem question="Vomiting and complications related to the digestive system" respond={form.question_3} />
		<FormItem question="Constipation or diarrhea" respond={form.question_4} />
		<FormItem question="Children cry a lot or quietly scary" respond={form.question_5} />
		<FormItem question="The first time the baby smile" respond={form.question_6} />
		<FormItem question="The first time the baby look at objects" respond={form.question_7} />
		<FormItem question="The first time the baby turns to look at the sound" respond={form.question_8} />
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
		<FormItem question="The child shake oddly" type="boolean" respond={form.question_20} />
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