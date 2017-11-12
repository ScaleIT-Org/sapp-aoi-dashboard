#!/bin/bash

echo "Sidecar running"
echo "pid is $$"

#check if etcd is up and running
STR='"health": "false"'
STR=$(curl -sb -H "Accept: application/json" "http://192.168.0.29:2379/health")
while [[ $STR != *'"health": "true"'* ]]
do
	echo "Waiting for etcd ..."
	STR=$(curl -sb -H "Accept: application/json" "http://192.168.0.29:2379/health")
	sleep 1
done

#Register Application
curl -L -X PUT http://192.168.0.29:2379/v2/keys/Apps/Machine1 -d value="localhost:3001"
curl -L -X PUT http://192.168.0.29:2379/v2/keys/Icon/Machine1 -d value="/icon/favicon.png"


# SIGTERM-handler
term_handler() {
  echo "[Sidecar] Shutting Down"

  curl -L -X PUT http://192.168.0.29:2379/v2/keys/Apps/Machine1 -XDELETE
  curl -L -X PUT http://192.168.0.29:2379/v2/keys/Icon/Machine1 -XDELETE

  exit 143; # 128 + 15 -- SIGTERM
}

# setup handlers
# on callback, kill the last background process, which is `tail -f /dev/null` and execute the specified handler
trap 'kill ${!}; term_handler' SIGTERM SIGINT


#run application
node machine1.js &

# wait forever
while true
do
  tail -f /dev/null & wait ${!}
done
