import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Tab 	from 'react-toolbox/lib/tabs/Tab';
import Tabs from 'react-toolbox/lib/tabs/Tabs';

import {Editor, EditorState, RichUtils, convertFromRaw, convertToRaw} from 'draft-js';
import RichText from '../../commons/RichText';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class Report extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			reportPart: 0,
			dialogActive: false,
			tEditorState: EditorState.createEmpty(),
		};
		this.handleAddReportRequest 	= this.handleAddReportRequest.bind(this);
		this.handleEditorStateChange 	= this.handleEditorStateChange.bind(this);
		this.handleReportPartChange 		= this.handleReportPartChange.bind(this);
		this.handleOpenUpdateReportDialog 	= this.handleOpenUpdateReportDialog.bind(this);
		this.handleCloseUpdateReportDialog 	= this.handleCloseUpdateReportDialog.bind(this);

	}

	handleAddReportRequest() {
		const rawDraftContentState = JSON.stringify( convertToRaw(this.state.tEditorState.getCurrentContent()) );
		ipcRenderer.send('putReportRequest', rawDraftContentState, this.props.report.id, this.state.reportPart);
		this.setState({
    	dialogActive: false,
    });
	}

	handleEditorStateChange(editorState) {
		this.setState({
			tEditorState: editorState,
		});
	}

	handleReportPartChange(index) {
		this.setState({
    	reportPart: index,
    });
	}

	handleOpenUpdateReportDialog() {
		this.setState({
    	dialogActive: true,
    });
	}

	handleCloseUpdateReportDialog() {
    this.setState({
    	dialogActive: false,
    });
	}

	RenderReport = () => {
		const report = this.props.report;
		var ReportPart 	= "";
		var editorState = EditorState.createEmpty();
		var tEditorState = editorState;

		// Render the part of the report the user want to look at

		if(this.state.reportPart === 0)
			ReportPart = report.content_1;
		else if(this.state.reportPart === 1)
			ReportPart = report.content_2;	
		else if(this.state.reportPart === 2)
			ReportPart = report.content_3;
	
		if(ReportPart.length !== 0)
			editorState = EditorState.createWithContent(convertFromRaw( JSON.parse(ReportPart)));
		else
			editorState = EditorState.createEmpty();

		tEditorState = editorState;

		return (
      <div className="report-content">
      	<Dialog className="report-dialog" active={this.state.dialogActive} type="large" onOverlayClick={this.handleCloseUpdateReportDialog}>
			    <RichText editorState={editorState} stateChange={this.handleEditorStateChange}/>
			    <Button className="submit-report-button" icon='add' label='Submit' onClick={this.handleAddReportRequest} raised primary />
      	</Dialog>
      	<div className="report-parts-container">
					<Tabs className="report-parts-tabs" index={this.state.reportPart} onChange={this.handleReportPartChange} fixed>
						<Tab icon='filter_1'></Tab>
						<Tab icon='filter_2'></Tab>
						<Tab icon='filter_3'></Tab>
					</Tabs>
        	<div><Button className="report-parts-update-button" icon='update' label='Update Report' onClick={this.handleOpenUpdateReportDialog} raised primary /></div>
				</div>
				<Editor editorState={editorState} />
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