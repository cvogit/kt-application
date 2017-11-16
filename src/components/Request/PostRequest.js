import React, { Component } from 'react';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class PostRequest extends Component {
  constructor(){
    super();
    this.state = {
      title : '',
      body  : '',
      userId: ''
    }
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleUseridChange = this.handleUseridChange.bind(this);
    this.handleRequestSubmit = this.handleRequestSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleBodyChange(event) {
    this.setState({body: event.target.value});
  }

  handleUseridChange(event) {
    this.setState({userId: event.target.value});
  }

  handleRequestSubmit(event) {
    event.preventDefault();
    ipcRenderer.send('postRequest', this.state);
  }

  render() {
    return (
      <form  onSubmit={this.handleRequestSubmit}>
        Create a new post on remote server(Can only create one post as the server fakes it):<br></br><br></br>
        <input type="text" name="title" placeholder="title" onChange={this.handleTitleChange}></input><br></br><br></br>
        <input type="text" name="body" placeholder="body" onChange={this.handleBodyChange}></input><br></br><br></br>
        <input type="text" name="userId" placeholder="userId (num)" onChange={this.handleUseridChange}></input><br></br><br></br>
        <input type="submit" value="Create"></input>
      </form>
    );
  }
}

export default PostRequest;