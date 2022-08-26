FROM node:16.13.1
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["node","index.js"]
