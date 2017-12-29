FROM node:boron

WORKDIR /opt/app

ADD package.json /tmp/package.json
RUN apt-get update && cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
ADD ./ /opt/app/

EXPOSE 3000

CMD ["./sidecar.sh"]
# using array notation causes node to be PID1 and will not exit properly. Without the array notation the shell forwards the sigterm correctly. 
# CMD ["node", "index.js"]
