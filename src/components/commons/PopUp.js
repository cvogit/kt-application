import React, { Component } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import '../../css/commons/popup.css';

class PopUp extends Component {

	render() {

		return (
			<div className="popup-container">
        <div className="popup-header">
          <h1>{ this.props.title }</h1>
        </div>
        <div className="popup-content">
          <h5>{ this.props.content }</h5>
        </div>
      </div>
		);
	}
}

export default PopUp;