FROM node:23.0.0

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 4040
CMD ["yarn", "start"]