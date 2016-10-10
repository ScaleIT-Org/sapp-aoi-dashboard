FROM teco/nodejs:latest

WORKDIR /app

ADD ./ /app/

EXPOSE 3000

CMD node index.js
# using array notation causes node to be PID1 and will not exit properly. Without the array notation the shell forwards the sigterm correctly. 
# CMD ["node", "index.js"]
