import React, { Component } from 'react';

import PostTable from './PostTable';
import RequestTable from './RequestTable';
import '../css/Content.css';

class Content extends Component {
	render() {
		return (
			<div className="App-body">
				<div className="test-container">
					<p>
						API provided by http://jsonplaceholder.typicode.com
					</p>
					<RequestTable />
					<PostTable/>
				</div>
			</div>
		);
	}
}

export default Content;