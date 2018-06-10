import React, { Component } from 'react';

import '../../css/commons/popup.css';

class PopUp extends Component {

	render() {

		return (
      <div className="popup-container">
        <div className="popup-title">
          <h5>MESSAGE</h5>
        </div>
        <div className="popup-content">
          <h5>{ this.props.content }</h5>
        </div>
      </div>
		);
	}
}

export default PopUp;