Run locally the web app :
- npm start

### Run the application with Docker
If you don't have npm, go into the webappui directory. Then you can juste run the docker container by executing the following commands :
- docker build -t webappui .
- docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true webappui 

### Definition of each folder and file in src/ :
- src/components/ : Contains the customized components used everywhere in the application

- src/layout/ : The layout folder corresponds to the main frames of the pages. For instance, the profile folder within src/layout/ is used for the main structure of the profile page. Each layout has specific components in the name_layout/component/ folder and also use generic components from the component/ folder or the examples/ folder. The data folders contains the data being shown by the page (soon to be replaced by the data coming from GCP)

- src/examples/ : Complex components made of built-in React components and customized components found in src/components. Can also be used in any layout contrary to specific components

- src/snippets/ : Used to keep snippets of code that are going to be useful in the next features of the platform

- src/assets/ : Contains the images used in the website as well as so pre-made themes (CSS attributes) for the components

- src/context/ : Used to control the global state of the components like the navigation bar

- src/routes.js : Contains all the pages and their path

- src/App.js : Landing page (uses the dashboard layout), imported in index.js

- src/index.js : Main file executed by the application


### Some good practices if you are to modifiy the frontend :
- To add a page, create a layout in the src/layout folder
- To add a component reused in several different layouts, add it in the examples/ folder

### Authors
- Clément ANDRÉ
- Malo LE GOFF

