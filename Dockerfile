FROM node:8.2.1

# Create app directory
ENV WEDEPLOY_APP_DIRECTORY=/wedeploy/app
RUN mkdir -p $WEDEPLOY_APP_DIRECTORY
WORKDIR $WEDEPLOY_APP_DIRECTORY

# Install app dependencies
ADD package.json $WEDEPLOY_APP_DIRECTORY
ENV NODE_ENV production
RUN npm install
RUN npm build

# Bundle app source
ADD . $WEDEPLOY_APP_DIRECTORY
ADD .next $WEDEPLOY_APP_DIRECTORY
EXPOSE 80
CMD [ "npm", "start" ]
