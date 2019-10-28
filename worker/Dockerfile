FROM node:alpine
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]

# docker build .   
# to run call code above in worker file

#start script can be found in package.json