import React, { Component } from 'react';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class DeleteRequest extends Component {
  constructor(){
    super();
    this.state = {
      id    : ''
    }
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleRequestSubmit = this.handleRequestSubmit.bind(this); 
  }

  handleIdChange(event) {
    this.setState({id: event.target.value});
  }

  handleRequestSubmit(event) {
    event.preventDefault();
    ipcRenderer.send('deleteRequest', this.state.id);
  }

  render() {
    return (
      <form  onSubmit={this.handleRequestSubmit}>
        Enter a post id to delete the post from remote server and local if it is stored (only 1-100 for remote):<br></br><br></br>
        <input type="text" name="id" placeholder="id" onChange={this.handleIdChange}></input><br></br><br></br>
        <input type="submit" value="Delete"></input>
      </form>
    );
  }
}

export default DeleteRequest;