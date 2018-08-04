import React, { Component } from 'react';

import FormItem 		from './FormItem';

class InfancyForm extends Component { 
	constructor(props) {
		super(props);
	}

	RenderInfancyForm = () => {
		
		const form = this.props.form[0];

		return (
      <div className="form">
     		<div className="form-name">
					INFANCY PERIOD
			  </div>
      	<FormItem question="Infant weight" respond={form.question_1} />
      	<FormItem question="Infant length" respond={form.question_2} />
      	<FormItem question="Infant head radius" respond={form.question_3} />
      	<FormItem question="Infant skin color" respond={form.question_4} />
      	<FormItem question="Cry after birth" respond={form.question_5} />
      	<FormItem question="Special treatments after birth" respond={form.question_6} />
      	<FormItem question="Other details during infancy" respond={form.question_7} />
      </div>
			);
	}

	render() {	

		return (
			<this.RenderInfancyForm />
			);
	}

}

export default InfancyForm;