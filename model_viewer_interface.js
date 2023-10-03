// Class for interfacing with 3D Models from <model-viewer>
class model_viewer_interface {
	id; //the html id of the model
	model;

	constructor(id) {
		this.id = id;
		this.model = document.getElementById(id);
	}


}