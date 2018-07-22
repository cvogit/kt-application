import React, { Component } from 'react';
import ReactPaginate 	from 'react-paginate';

import Announcement 	from './homepage/Announcement';
import Banner 				from '../commons/Banner';

import '../../css/content/homePage.css';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			announcements : [],
			offset 				: 0,
			pagination		: 1,
			total 				: 0,
			selected			: 0,
		};

		this.AnnouncementSetUp = this.AnnouncementSetUp.bind(this);
		this.handlePageClick = this.handlePageClick.bind(this);
	}

	componentDidMount() {
		ipcRenderer.send('homePageReady');
		ipcRenderer.on('updateAnnouncements', 		this.AnnouncementSetUp);
	}

	AnnouncementSetUp(event, result, offset, total) {
		var newAnnouncements = this.state.announcements.concat(result);
		
		this.setState({
			announcements : newAnnouncements,
			offset: 				offset,
			total: 					total,
		});
	}

	handlePageClick(event) {
		this.setState({
			selected: event.selected,
		});
  };

	RenderHomePage = () => {
		const pageCount 	= this.state.offset / 5;
		const currentPage = this.state.selected * 5;

    var announcements;
		var currentAnnouncement;

    if ( this.state.total === 0 ) {
  		announcements = <Announcement date={ new Date() } title="Welcome" content="There are no new announcements." />;
  		currentAnnouncement = announcements;

		} else {
     	announcements = this.state.announcements.map(function(announcement) {
				return <Announcement key={announcement.created_at}
														 date={announcement.created_at}
														 title={announcement.title}
														 content={announcement.content} />
			});
			currentAnnouncement = announcements.slice(currentPage, currentPage + 5);
		}
    
		return (
			<div className="homepage-container">
				<Banner alt="banner-icon" />
				<div className="homepage-content">
					{ currentAnnouncement }

					<ReactPaginate previousLabel={"previous"}
                 nextLabel={"next"}
                 breakLabel={<a href="">...</a>}
                 breakClassName={"break-me"}
                 pageCount={pageCount}
                 marginPagesDisplayed={2}
                 pageRangeDisplayed={2}
                 onPageChange={this.handlePageClick}
                 containerClassName={"pagination"}
                 subContainerClassName={"pages pagination"}
                 activeClassName={"active"} 
                 className="react-paginate" />
				</div>
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