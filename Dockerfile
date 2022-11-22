FROM node:18-alpine3.15

# Create app directory
WORKDIR /usr/src/bull-queue

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000 

RUN ["chmod", "+x", "/usr/src/bull-queue/start.sh"]

CMD sh start.sh