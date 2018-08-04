import React, { Component } from 'react';

import FormItem 		from './FormItem';

class BirthForm extends Component { 
	constructor(props) {
		super(props);
	}

	RenderBirthForm = () => {

		const form = this.props.form[0];
		
		return (
      <div className="form">
      	<div className="form-name">
					BIRTH INFORMATION
				</div>
      	<FormItem question="Birth weight and time period" respond={form.question_1} />
      	<FormItem question="Birth complications" respond={form.question_2} />
      	<FormItem question="Birth method" respond={form.question_3} />
      	<FormItem question="Others:"  respond={form.question_4} />
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