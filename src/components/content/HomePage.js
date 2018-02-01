import React, { Component } from 'react';

import Announcement from './homepage/Announcement';
import Banner 			from './homepage/Banner';

import '../../css/content/homePage.css';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			announcements : [],
			offset 				: 0,
			total 				: 0,
		};

		this.handleAnnouncementSetUp = this.handleAnnouncementSetUp.bind(this);
	}

	componentWillMount() {
	}

	componentDidMount() {
		ipcRenderer.send('getAnnouncementsRequest');
		ipcRenderer.on('getAnnouncementsSuccess', 		this.handleAnnouncementSetUp);
	}

	handleAnnouncementSetUp(event, result, offset, total) {
		var newAnnouncements = this.state.announcements.concat(result);
		this.setState({
			announcements : newAnnouncements,
			offset: 				offset,
			total: 					total,
		});
	}

	RenderHomePage = () => {
		const count = this.state.offset;
    const ann 	= this.state.announcements.map(function(announcement) {
				return <Announcement key={announcement.created_at}
														 date={announcement.created_at}
														 title={announcement.title}
														 content={announcement.content} />
			});

		return (
			<div className="home-page">
				<Banner />
				{ ann }

				{ count }
			</div>
			);
	}

	render() {	
		return (
			<this.RenderHomePage />
		);
	}
}


export default HomePage;