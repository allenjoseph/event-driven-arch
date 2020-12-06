FROM node:latest
RUN apt-get update -qq && \
  apt-get install -y -qq libzmq3-dev

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:prod"]
