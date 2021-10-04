# get the image
FROM node:current-buster-slim

# set working directory
WORKDIR /user/src/app

# copy content
COPY ./package.json ./
COPY ./yarn.lock ./

# run
RUN npm install

# copy rest
COPY . .

# expose ports
EXPOSE 3000

CMD ["npm", "start"]