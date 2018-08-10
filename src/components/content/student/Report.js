import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Input  from 'react-toolbox/lib/input/Input';
import Tab 	from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

import ReportPart from './ReportPart';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class Report extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			reportPart: 0,
			reportUpdateContent: '',
			dialogActive: false,
		};

		this.handleUpdateReportRequest 		= this.handleUpdateReportRequest.bind(this);
		this.handleReportPartChange 			= this.handleReportPartChange.bind(this);
		this.handleOpenUpdateReportDialog 	= this.handleOpenUpdateReportDialog.bind(this);
		this.handleUpdateReportDialogExit 	= this.handleUpdateReportDialogExit.bind(this);
	}

	componentDidMount() {
		this.setState({
    	reportUpdateContent: this.props.report.content_1,
    });
	}

	handleUpdateReportRequest() {
		ipcRenderer.send('putReportRequest', this.state.reportUpdateContent, this.props.report.id, this.state.reportPart + 1);
		this.setState({
    	dialogActive: false,
    });
	}

	handleReportPartChange(index) {
		this.setState({
    	reportPart: index,
    });
	}

	handleOpenUpdateReportDialog() {
		var currentContent = '';

		if(this.state.reportPart === 0) {
    	currentContent = this.props.report.content_1;
    } else if (this.state.reportPart === 1) {
    	currentContent = this.props.report.content_2;
    } else if (this.state.reportPart === 2) {
    	currentContent = this.props.report.content_3;
    }
		this.setState({
			reportUpdateContent: currentContent,
    	dialogActive: true,
    });
	}

	handleUpdateReportDialogExit() {
    this.setState({
    	dialogActive: false,
    });
	}

	handleUpdateReportContentChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

	RenderReport = () => {
		const report = this.props.report;
		var renderReport = null;
		var dialogLabel = 'Report part ';

		// Render the part of the report the user want to look at
		if(this.state.reportPart === 0) {
			renderReport = <ReportPart title="Part 1" content={report.content_1} />;
			dialogLabel += '1';
		}
		else if(this.state.reportPart === 1) {
			renderReport = <ReportPart title="Part 2" content={report.content_2} />;
			dialogLabel += '2';
		}
		else if(this.state.reportPart === 2) {
			renderReport = <ReportPart title="Part 3" content={report.content_3} />;
			dialogLabel += '3';
		}


		return (
      <div className="report-content">
      	<Dialog className="report-part-dialog" active={this.state.dialogActive} onOverlayClick={this.handleUpdateReportDialogExit}>
					<Input className="toolbox-textarea-report-part" type='text' multiline rows={10} label={dialogLabel} value={this.state.reportUpdateContent} onChange={this.handleUpdateReportContentChange.bind(this, 'reportUpdateContent')} maxLength={65535} />
			    
			    <Button className="submit-report-button" icon='add' label='Submit' onClick={this.handleUpdateReportRequest} raised primary />
      	</Dialog>
      	<div className="report-parts-container">
					<Tabs className="report-parts-tabs" index={this.state.reportPart} onChange={this.handleReportPartChange} fixed>
						<Tab icon='filter_1'></Tab>
						<Tab icon='filter_2'></Tab>
						<Tab icon='filter_3'></Tab>
					</Tabs>
        	<Button className="report-parts-update-button" icon='update' label='Update Report' onClick={this.handleOpenUpdateReportDialog} raised primary />
				</div>
				{renderReport}
      </div>
			);
	}

	render() {	

		return (
			<this.RenderReport />
			);
	}

}

export default Report;