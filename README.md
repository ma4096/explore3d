# README for explore3d

## !!! The current version is in no way stable or finished !!!

## What is the scope of the project?
	Allow easy access to 3D-models in a webbrowser, to be used in lectures. For example, students can be provided a QR-Code/link to a specific model and explore it whilst the lecturer explains technologic details.
	Models can easily be added using the .glb-format. 

## What technology is being used?
	The project is based on the open-source project <model-viewer> (https://modelviewer.dev/) and node.js (nodejs.org). node.js handles the backend, whilst <model-viewer> does the heavy lifting of the 3D-object client-side. When using the website, client-server communication is minimized as not to crash university's wifi in bigger lectures.

## What is the designed-for workflow?
	(- Set up node.js/the server (app.js))
	- Put all the models in your desired folder structure into the folder "models"
		-> There can also be a .jpg for each model (with exactly the same name) in the same folder as the model, it will be used as a thumbnail in the navigation.
		-> The filenames will be used as the names on the website
	- Run makeFileindex.py using Python (at least Python 3)
		-> This generates the fileindex.txt, which provides a json-object of the filestructure for the server. 
	- Start the server ("node app.js")
	- Finished

## Planned features:
	- Make use of animated models
 	- Make use of annotations (https://modelviewer.dev/examples/annotations/index.html) and design/implement an workflow for adding annotations.
