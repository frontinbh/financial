FROM node:8.2.1

# Create app directory
ENV WEDEPLOY_APP_DIRECTORY=/wedeploy/app
RUN mkdir -p $WEDEPLOY_APP_DIRECTORY
WORKDIR $WEDEPLOY_APP_DIRECTORY

# Install app dependencies
COPY . $WEDEPLOY_APP_DIRECTORY
ENV NODE_ENV production
RUN npm install
RUN npm run build

# Bundle app source
EXPOSE 80
CMD [ "npm", "start" ]
