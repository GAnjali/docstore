FROM node
WORKDIR /backendapp
COPY package.json ./
RUN npm install
RUN npm install -g sequelize-cli
COPY . .
CMD [ "npm", "run", "dev" ]