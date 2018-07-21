import React, { Component } from 'react';

import Button from 'react-toolbox/lib/button/Button';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import Input from 'react-toolbox/lib/input/Input';

import {Editor, EditorState, RichUtils, convertFromRaw, convertToRaw} from 'draft-js';

import RichText from '../../commons/RichText';

import '../../../css/reports.css';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class Reports extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			report: '',
			reportSelected: null,
			addReportDialog: false,
			editorState: EditorState.createEmpty(),
			displayState: EditorState.createEmpty(),
		};
		this.handleAddReportRequest 		= this.handleAddReportRequest.bind(this);
		this.handleEditorStateChange 		= this.handleEditorStateChange.bind(this);
		this.handleOpenAddReportDialog 	= this.handleOpenAddReportDialog.bind(this);
		this.handleReportExit 	= this.handleReportExit.bind(this);
		this.handleReportChange = this.handleReportChange.bind(this);
	}

	shouldComponentUpdate(prevProps, prevState) {
	  if (prevProps.reports !== this.props.reports) {
	    this.setState({
	    	reportSelected: null,
	    })
	  }
	  return true;
	}

	handleOpenAddReportDialog() {
    this.setState({
    	addReportDialog: true,
    });
	}

	handleAddReportRequest() {
		const rawDraftContentState = JSON.stringify( convertToRaw(this.state.editorState.getCurrentContent()) );
		ipcRenderer.send('addReportRequest', rawDraftContentState, this.props.studentId);
		this.setState({
    	addReportDialog: false,
    });
	}

	handleEditorStateChange(editorState) {
		this.setState({
			editorState: editorState,
		});
	}

	handleReportExit(event) {
		event.preventDefault();
    this.setState({
    	addReportDialog: false,
    });
  }

	handleReportChange(value) {
		this.setState({
			reportSelected: value
		});

		var Reports 				= this.props.reports;
		var SelectedReport 	= Reports[value];

		this.setState({
			displayState: EditorState.createWithContent(convertFromRaw( JSON.parse(SelectedReport.content)))
		});
	}

	handleAddReportChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

	reportDropdown (report) {
    const name = report.student.firstName + ' ' + report.student.lastName + ' (' + report.studentId + ')';

    return (
      <div className="dropdown-container">
        <div className="dropdown-content">
          <strong>{name}</strong>
          <small>{report.created_at}</small>
        </div>
      </div>
    );
  }

	RenderReports = () => {

		var Reports = this.props.reports;
		var count 	= 0;
		var SelectedReport 	= null;
		var content 				= null;

		if(Reports) {
			Reports.forEach( (report) => {
				report['value'] = count;
				count++;
			});
		} else 
			Reports = [];

		return (
			<div className="report" >
				<Dialog className="report-dialog" active={this.state.addReportDialog} type="large" onOverlayClick={this.handleReportExit}>
			    <RichText editorState={this.state.editorState} stateChange={this.handleEditorStateChange}/>
			    <Button className="submit-report-button" icon='add' label='Submit' onClick={this.handleAddReportRequest} raised primary />
      	</Dialog>
				<Dropdown
					className="report-dropdown"
          auto={false}
          source={Reports}
          onChange={this.handleReportChange}
          label='Select a report.'
          template={this.reportDropdown}
          value={this.state.reportSelected}
        />
        <Button className="report-button" icon='add' label='Add Report' onClick={this.handleOpenAddReportDialog} raised primary />
        <div className="report-container">
        	<div className="report-content">
        		<Editor editorState={this.state.displayState} />
        	</div>
        </div>
      </div>
			);
	}

	render() {	

		return (
			<this.RenderReports />
			);
	}

}

export default Reports;