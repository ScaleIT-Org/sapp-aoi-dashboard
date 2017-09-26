#!/bin/bash

echo "Sidecar running"
echo "pid is $$"

#set -x
curl -L -X PUT http://192.168.0.29:2379/v2/keys/Apps/Machine2 -d value="localhost:3002"
curl -L -X PUT http://192.168.0.29:2379/v2/keys/Icon/Machine2 -d value="/icon/favicon.png"


# SIGTERM-handler
term_handler() {
  echo "[Sidecar] Shutting Down"

  curl -L -X PUT http://192.168.0.29:2379/v2/keys/Apps/Machine2 -XDELETE
  curl -L -X PUT http://192.168.0.29:2379/v2/keys/Icon/Machine2 -XDELETE

  exit 143; # 128 + 15 -- SIGTERM
}

# setup handlers
# on callback, kill the last background process, which is `tail -f /dev/null` and execute the specified handler
trap 'kill ${!}; term_handler' SIGTERM SIGINT


#run application
node machine2.js &

# wait forever
while true
do
  tail -f /dev/null & wait ${!}
done
