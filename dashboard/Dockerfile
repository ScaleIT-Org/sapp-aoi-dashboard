FROM node:boron-alpine

WORKDIR /opt/app

COPY package.json /tmp/package.json
RUN apk update && cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
RUN apk add --update bash && rm -rf /var/cache/apk/*
RUN apk add --no-cache curl
COPY ./ /opt/app/

EXPOSE 3000

CMD ["./sidecar.sh"]
# using array notation causes node to be PID1 and will not exit properly. Without the array notation the shell forwards the sigterm correctly. 
# CMD ["node", "index.js"]
