# get the image
FROM NODE:14-slim

# set working directory
WORKDIR /usr/src/app

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