### Some notes about the architecture of the project

- webappui/ : Corresponds to the front-end of the platform, made in React.js. Composed of 3 folders : node_modules/ (react packages used by the application), public/ (thumbnails and icons of the web platform) and the src/ (containing all the react files and components)

### About the CI

For now, the CI pushes the updated image to the repository. The "deploy" step is about updating the image running on the cluster GKE. So an image has to be running before the deployment step gets executed