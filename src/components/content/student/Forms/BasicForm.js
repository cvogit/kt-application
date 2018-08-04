import React, { Component } from 'react';

import FormItem 		from './FormItem';

class BasicForm extends Component { 
	constructor(props) {
		super(props);
	}

	RenderBasicForm = () => {
		
		const form = this.props.form[0];
		
		return (
      <div className="form">
	      <div className="form-name">
					BASIC INFORMATION
				</div>
      	<FormItem question="Name" respond={form.question_1} />
      	<FormItem question="Birthday" respond={form.question_2} />
      	<FormItem question="Male" type="boolean" respond={form.question_3} />
      	<FormItem question="Female" type="boolean" respond={form.question_4} />
      	<FormItem question="Birth place" respond={form.question_5} />
      	<FormItem question="Address" respond={form.question_6} />
      	<FormItem question="Phone number 1" respond={form.question_7} />
      	<FormItem question="Phone number 2" respond={form.question_8} />
      	<FormItem question="Email" respond={form.question_9} />
      </div>
			);
	}

	render() {	

		return (
			<this.RenderBasicForm />
			);
	}

}

export default BasicForm;