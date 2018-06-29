import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import Gallery from 'react-grid-gallery';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

class UserPictures extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			file: '',
			uploadImageBase64: null,
			uploadImageType: '',

			dialogActive: 	false,
			dialogSelected: null,
		};

		this.handleSelectImage 			= this.handleSelectImage.bind(this);
		this.handleSelectImageFile 	= this.handleSelectImageFile.bind(this);

		this.loadUserPictures 	= this.loadUserPictures.bind(this);

		this.handleUploadImageDialogOpen = this.handleUploadImageDialogOpen.bind(this);
		this.handleDeleteImageDialogOpen = this.handleDeleteImageDialogOpen.bind(this);

		this.handleDialogExit 	= this.handleDialogExit.bind(this);

		this.handleUploadImageRequest = this.handleUploadImageRequest.bind(this);
		this.handleDeleteImageRequest = this.handleDeleteImageRequest.bind(this);
	}

	componentDidMount() {
		ipcRenderer.send('getUserPictures');
		ipcRenderer.on('loadUserPictures', 	this.loadUserPictures);
	}

	loadUserPictures(event, userPictures) {
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
		};

		this.setState({
			images: imagesRender,
		})
	}

	handleSelectImage (index, image) {
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

	handleSelectImageFile (event) {
    let reader = new FileReader();
    let file = event.target.files[0];

    // store the rendered image preview
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        uploadImageBase64: reader.result,
        uploadImageType: file.type,
      });
    }
  }

  handleUploadImageDialogOpen() {
  	this.setState({
    	dialogActive: 	true,
    	dialogSelected: 'upload',
    });
  }

  handleDeleteImageDialogOpen() {
  	this.setState({
    	dialogActive: 	true,
    	dialogSelected: 'delete',
    });
  }

  handleDialogExit() {
    this.setState({
    	dialogActive: 	false,
    	dialogSelected: null,
    });

    if(this.state.uploadImageUrl) {
    	this.setState({
        uploadImageBase64: null,
        uploadImageType: '',
    	});
    }
  }

  handleUploadImageRequest() {
  	const imageFileBase64 = this.state.uploadImageBase64;
  	const imageType 			= this.state.uploadImageType;
  	if(imageFileBase64) {
			ipcRenderer.send('postImagesRequest', imageFileBase64, imageType);
  	}
  }

  handleDeleteImageRequest(pImageSrcArray) {
  	if(pImageSrcArray.length > 0) {}
			ipcRenderer.send('deleteImagesRequest', pImageSrcArray);
  }

	RenderUserPictures = () => {
		var galleryImages = this.state.images;

		const openUploadDialog = this.handleUploadImageDialogOpen;
		const openDeleteDialog = this.handleDeleteImageDialogOpen;

		const selectImageFile = this.handleSelectImageFile;
		const dialogExit = this.handleDialogExit;

		var dialogActive = this.state.dialogActive;
		if(dialogActive === 'undefined')
			dialogActive = false;

		var dialog = null;

		if(this.state.dialogActive !== null)	{
			if(this.state.dialogSelected === 'upload') {
				// Dialog to upload new images
				const inputImage = this.state.uploadImageBase64;
				dialog = 	<Dialog className="dialog-container" active={dialogActive} type="normal">
										<div className="image-preview-container">
											<img src={inputImage} alt="Image preview." />
											<input className="file-input" type="file" onChange={selectImageFile} />
										</div>
										<Button label='Upload' onClick={() => this.handleUploadImageRequest()} />
										<Button label='Cancel' onClick={dialogExit} />
								  </Dialog>;
			} else if(this.state.dialogSelected === 'delete') {
				// Dialog to delete selected image
				var selectedImages = [];
				galleryImages.forEach( (image) => {
					if(image.isSelected)
						selectedImages.push(image.src);
				});

				var dialogMessage = "No image selected.";
				if(selectedImages.length > 0)
					dialogMessage = "Delete selected images?";

				dialog = 	<Dialog className="dialog-container" active={dialogActive} type="normal">
										<h4>{dialogMessage}</h4>
										<Button label='Delete' onClick={() => this.handleDeleteImageRequest(selectedImages)} />
										<Button label='Cancel' onClick={dialogExit} />
			        		</Dialog>;
			}
		}

		return (
			<div className="userpage-main-content">
				{dialog}
				<div className="image-gallery-sidebar">
					<Button className="picture-button" label='Add Image' raised primary onClick={openUploadDialog} />
					<Button className="picture-button" label='Delete Selected' raised primary onClick={openDeleteDialog} />
				</div>
				<div className="image-gallery-container">
					<Gallery images={galleryImages} onSelectImage={this.handleSelectImage} backdropClosesModal={true} />
				</div>
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