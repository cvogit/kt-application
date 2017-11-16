import React, { Component } from 'react';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

const Post = ({props}) => {
	return (
		<div className="post">
			<a>Post {props.id}</a>
			<h4 className="postTitle">{props.title}</h4>
			<p className="postBody">{props.body}</p>
			<h6 className="postAuthor">By user {props.userId}</h6>
		</div>
	);
}

class PostTable extends Component {
	constructor() {
    super();
    this.state = {
  		posts 	: []
   	};
    this.postUpdate = this.postUpdate.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.deleteError = this.deleteError.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on('getResult', this.postUpdate);
    ipcRenderer.on('postResult', this.postUpdate);
    ipcRenderer.on('deleteResult', this.deletePost);
    ipcRenderer.on('deleteError', this.deleteError);
  }

  postUpdate(event, arg) {
    this.setState({posts: this.state.posts.concat(arg)});
  }

  deletePost(event, arg) {
    const id = arg;
    var index = this.state.posts.findIndex(post => post.id == id);
    if(index < 0)
      alert("Post doesn't exist on local session.");
    else {
      var newPosts = this.state.posts.slice();
      newPosts.splice(index, 1);
      this.setState({posts: newPosts});
    }
  }

  deleteError(event, arg) {
    alert("Could not delete post "+arg+" (doesn't exist in remote)");
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
  	const postsList = this.state.posts.map((post) => 
			<Post key={post.id.toString()} props={post}/>
		);
    return (
      <div className="postTable">
      	Posts stored with session: {this.state.test}<br></br>
      	{postsList}
      </div>
    );
  }
}

export default PostTable;