FROM node:24-alpine
ENV NODE_ENV=production
ENV PORT=3000
ENV ORIGIN="*"
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --no-audit --no-fund --ignore-scripts
COPY ./bin ./bin
COPY ./public ./public
COPY ./routes ./routes
COPY ./app.js ./app.js
CMD [ "node", "./bin/www" ]
EXPOSE 3000
