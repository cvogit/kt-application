import React, { Component } from 'react';

import FormItem 		from './FormItem';

class FamilyForm extends Component { 
	constructor(props) {
		super(props);
	}

	RenderFamilyForm = () => {
		const form = this.props.form[0];
		
		return (
      <div className="form">
      	<div className="form-name">
					FAMILY INFORMATION
				</div>
      	<FormItem question="Mother Name" respond={form.question_1} />
      	<FormItem question="Mother Birthday" respond={form.question_2} />
      	<FormItem question="Mother Occupation" respond={form.question_3} />
      	<FormItem question="Mother Nationality" respond={form.question_4} />
      	<FormItem question="Father Name" respond={form.question_5} />
      	<FormItem question="Father Birthday" respond={form.question_6} />
      	<FormItem question="Father Occupation" respond={form.question_7} />
      	<FormItem question="Father Nationality" respond={form.question_8} />
      	<FormItem question="Siblings (name, birthday, and gender)" respond={form.question_9} />
      	<FormItem question="Parents are together" type="boolean" respond={form.question_10} />
      	<FormItem question="History of family illness" respond={form.question_11} />
      	<FormItem question="Details of family illness" respond={form.question_12} />
      </div>
			);
	}

	render() {	

		return (
			<this.RenderFamilyForm />
			);
	}

}

export default FamilyForm;