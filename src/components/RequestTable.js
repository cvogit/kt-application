import React, { Component } from 'react';

import GetRequest from './Request/GetRequest';
import PostRequest from './Request/PostRequest';
import DeleteRequest from './Request/DeleteRequest';
import '../css/RequestTable.css';

const RenderRequestForm = ({select}) => {
  const key = select;
  return (
    <div>
      {{
        'get':    <GetRequest/>,
        'post':   <PostRequest/>,
        'delete': <DeleteRequest/>,
      }[key]}
    </div>
  );
}

class RequestTable extends Component {
  constructor(){
    super();
    this.state = {
      select  : '',
      host    : 'http://jsonplaceholder.typicode.com'
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(event) {
    this.setState({select: event.target.value});
  }
  render() {
    return (
      <div>
        <form className="selectRequest">
          <label>
            Pick a request, {this.state.test}<br></br>
            <select onChange={this.handleSelectChange}>
              <option>N/A</option>
              <option value="get">Get</option>
              <option value="post">Post</option>
              <option value="delete">Delete</option>
            </select>
          </label>
        </form><br></br>
        <div className="requestForm">
          <RenderRequestForm select={this.state.select}/>
        </div>
      </div>
    );
  }
	
}

export default RequestTable;