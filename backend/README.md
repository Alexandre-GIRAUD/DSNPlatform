### Execute the backend container :
- docker build --tag backend_webapp .
- docker run -it --rm -v ${PWD}:/backend -p 5001:5000 -e CHOKIDAR_USEPOLLING=true backend_webapp
