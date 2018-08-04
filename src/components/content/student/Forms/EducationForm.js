import React, { Component } from 'react';

import FormItem 		from './FormItem';

class EducationForm extends Component { 
	constructor(props) {
		super(props);
	}

	RenderEducationForm = () => {

		const form = this.props.form[0];

		return (
			<div className="form">
				<div className="form-name">
					EDUCATION AND TREATMENT FOR CHILDREN	
				</div>
				<FormItem question="According to you, what is the cause of the defect in children?" respond={form.question_1} />
				<FormItem question="Children are raised" respond={form.question_2} />
				<FormItem question="Children are raised by" respond={form.question_3} />
				<FormItem question="Is the child attending kindergarten or boarding school or center?" respond={form.question_4} />
				<FormItem question="Does the child have a doctor's visit to a pediatrician for a particular reason? Result?" respond={form.question_5} />
				<FormItem question="What medications did the child take? On time?" respond={form.question_6} /> />
			</div>
			);
	}

	render() {	

		return (
			<this.RenderEducationForm />
			);
	}

}

export default EducationForm;