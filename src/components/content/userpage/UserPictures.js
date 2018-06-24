import React, { Component } from 'react';
import { render } from 'react-dom';
import Gallery from 'react-grid-gallery';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class UserPictures extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: '',
		};

		this.onSelectImage = this.onSelectImage.bind(this);
	}

	componentDidMount() {
		const userPictures = this.props.pictures;
		console.log(userPictures);
		var imagesRender = [];

		if(userPictures) {
			userPictures.forEach( (image) => {
				imagesRender.push({
		      src: image,
		      thumbnail: image,
		      thumbnailWidth: 300,
		      thumbnailHeight: 170,
		      isSelected: false,
				});
			});
		}
		this.setState({
			images: imagesRender,
		})
	}

	onSelectImage (index, image) {
    var images = this.state.images.slice();
    var img = images[index];
    if(img.hasOwnProperty("isSelected"))
        img.isSelected = !img.isSelected;
    else
        img.isSelected = true;

    this.setState({
        images: images
    });
  }

	RenderUserPictures = () => {
		const galleryImages = this.state.images;

		return (
			<div className="userpage-center-content">
					<Gallery images={galleryImages} onSelectImage={this.onSelectImage} />
			</div>
			);
	}

	render() {	
		return (
			<this.RenderUserPictures />
			);
	}
}


export default UserPictures;