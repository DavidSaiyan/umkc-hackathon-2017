**2017 UMKC Hackathon - Team Got-Cha**

This is an image processing application. A user can choose an image or specify a url of an image then analyze the image.

**Image Analysis**

The image analysis consists of 3 different categories. Is it Lebron James, Find Similar, and Find Logo. 

Is it Lebron - Checks to see if the image contains Lebron James in the photo. 
This is done by using the Kairos api, which we trained with some photos of Lebron James to recognize his face. 

Find Similar - Provides a list of themes/concepts that are present in the image along with their probability of relevance. 

Find Logo - This checks to see if there is a logo present in the image. It wlll return a list of matching results with probabilities. 

**Running The Application**

To run this application first clone it from this directory. 

First go to the Node Server folder and run the command 'npm install' from your command line to install the dependencies for this project.
Then run the command 'node server.js' from the command line. This will start the node server on port 4215. 

Next, open the Hackathon-Project folder (angularjs app) in vscode, webstorm, or any other ide and run the index.html page in your browser to see the web app. 

That is it. You may now process images. 