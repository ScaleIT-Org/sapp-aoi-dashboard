#!/bin/bash

echo "Sidecar running"
echo "pid is $$"

#check if etcd is up and running
STR='"health": "false"'
STR=$(curl -sb -H "Accept: application/json" "http://etcd:2379/health")
while [[ $STR != *'"health": "true"'* &&  $STR != *'"health":"true"'* ]] 
do
        echo "Waiting for etcd ..."
        STR=$(curl -sb -H "Accept: application/json" "http://etcd:2379/health")
        sleep 1
done


#set -x
curl -L -X PUT http://etcd:2379/v2/keys/M2/url -d value="localhost:49552"
curl -L -X PUT http://etcd:2379/v2/keys/M2/icon -d value="/icon/favicon.png"


# SIGTERM-handler
term_handler() {
  echo "[Sidecar] Shutting Down"

  curl -L -X PUT 'http://etcd:2379/v2/keys/M2?recursive=true' -XDELETE

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
