# README for explore3d

## What is the scope of the project?
Allow easy access to 3D-models in a webbrowser, to be used in lectures. For example, students can be provided a QR-Code/link to a specific model and explore it whilst the lecturer explains technical details.
Models can easily be added using the .glb-format. 

## What technology is being used?
The project is based on the open-source project [<model-viewer>](https://modelviewer.dev/) and [node.js](nodejs.org). node.js handles the backend, whilst <model-viewer> does the heavy lifting of the 3D-object client-side.

## What is the designed-for workflow?
- (Set up node.js/the server (app.js))
- Put all the models in your desired folder structure into a (new) folder "models"
	- The filenames will be used as the names on the website
	- (First delete the examples)
- Run makeFileindex.py using Python (at least Python 3)
	- This generates the fileindex.txt, which provides a json-object of the filestructure for the server.
  	- Also creates infrastructure for the next steps
- Optional:
	- Add a thumbnail for each model into the _(modelname)-Folder next to the model (I am working on an automation)
	- Launch annotation program to add annotations to your models (node app_annotator.js)
		- Open it under port 4000 by default, everything else is explained on the site.
  		- To save your changes, you'll need a password (default: password), which can be changed at the top of app_annotator.js
		- The server can be shutdown again (ctrl+c)
- Start the server ("node app.js"), accessable under port 3000 by default, can be changed at the top of app.js.
- Finished

## Other information
- This was made as a project at a university, hence the branding which can be easily changed when you dig into the code.

## Planned features:
- Make use of animated models (10.10.23: mostly implemented)
	- Make annotations track on animation like [example](https://modelviewer.dev/examples/annotations/index.html#animatedHotspots).
- More options for annotations (styling, other positions)
- Automated screenshot-to-thumbnail
- Make better use of AR/XR (https://modelviewer.dev/examples/augmentedreality/)
	- Show annotations, animations
 - ... and whatever else comes up
