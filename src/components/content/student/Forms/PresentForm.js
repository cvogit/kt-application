import React, { Component } from 'react';

import FormItem 		from './FormItem';

class PresentForm extends Component { 
	constructor(props) {
		super(props);
	}

	RenderPresentForm = () => {
		
		const form = this.props.form[0];

		return (
			<div className="form">
				<div className="form-name">
					CURRENT STATUS
				</div>
				<FormItem question="Current behaviors of children (details)" respond={form.question_1} />
				<FormItem question="Current treatment and treatment methods" respond={form.question_2} />
				<FormItem question="Current medications currently used (name? Time? Dosage?)" respond={form.question_3} />
				<FormItem question="Other important information parents want us to note to support them?" respond={form.question_4} />
			</div>
			);
	}

	render() {	

		return (
			<this.RenderPresentForm />
			);
	}

}

export default PresentForm;