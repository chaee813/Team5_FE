# Build stage
FROM krmp-d2hub-idock.9rum.cc/goorm/node:16
WORKDIR /usr/src/app
COPY ./ ./
ENV REACT_APP_TOSS_CLIENT_KEY=test_ck_kYG57Eba3GZ6EDp2M598pWDOxmA1
RUN npm ci
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
