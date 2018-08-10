import React, { Component } from 'react';

import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';

class FormItem extends Component { 

	RenderFormItem = () => {

		var content = null;
		
		if( this.props.type === "boolean" ) {
			if( this.props.respond ) {
				content = <div>
										<FontIcon className="form-icon" value="check_box" />
										<div className="form-icon-question">
											{this.props.question}
										</div>
									</div>;
			} else {
			content = 	<div>
										<FontIcon className="form-icon" value="check_box_outline_blank" />
										<div className="form-icon-question">
											{this.props.question}
										</div>
									</div>;
			}
		} else {
			content = 	<div>
										<div className="form-question">
											{this.props.question}
										</div>
										<div className="form-answer">
											{this.props.respond}
										</div>
									</div>;	
		}

		return (
			<div className="form-item">
				{content}
			</div>
			);
	}

	render() {	

		return (
			<this.RenderFormItem />
			);
	}

}

export default FormItem;