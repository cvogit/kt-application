import React, { Component } from 'react';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class GetRequest extends Component {
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
    ipcRenderer.send('getRequest', this.state.id);
  }

  render() {
    return (
      <form  onSubmit={this.handleRequestSubmit}>
        Enter an id (post 1-100 already exist) to fetch a post from remote server, empty parameter will fetch 10 posts:<br></br><br></br>
        <input type="text" name="id" placeholder="id" onChange={this.handleIdChange}></input><br></br><br></br>
        <input type="submit" value="Search"></input>
      </form>
    );
  }
}

export default GetRequest;