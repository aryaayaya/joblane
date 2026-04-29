FROM node:20-alpine

WORKDIR /app

# copy package files first
COPY package*.json ./

# install dependencies INSIDE container
RUN npm install

# now copy rest of backend code
COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]