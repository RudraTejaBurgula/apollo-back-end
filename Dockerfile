FROM node:16.13.1
WORKDIR /app
COPY package.json ./
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi
#RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["node","index.js"]