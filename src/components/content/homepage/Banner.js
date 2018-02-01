import React, { Component } from 'react';

class Banner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time : 0,
		};
	}

	componentDidMount() {
		this.setState({
				time : new Date().getTime(),
			});
		setInterval(() => {
			this.setState({
				time : new Date().getTime(),
			});
		}, 1000);
	}

	RenderTime = () => {
		// PST-8 time
		const offset 	= -8;
		const time 		=	this.state.time;
		const date 		= new Date( time + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" );
		return (
				<div className="banner-date">
					{ date }
				</div>
			);
	}

	render() {	
		return (
			<div className="banner-container">
				<div className="banner-content">			
					Welcome
				</div>
				<this.RenderTime />
			</div>
		);
	}
}


export default Banner;