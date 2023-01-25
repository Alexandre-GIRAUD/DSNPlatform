# pull official base image
FROM node:14.17.6-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

#COPY package-lock.json ./
RUN npm install
RUN touch cred.txt

# add apps
COPY . ./

WORKDIR /app/src

# start app
CMD ["npm","start"]  