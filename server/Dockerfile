FROM node
WORKDIR /backendapp
COPY package.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "dev" ]