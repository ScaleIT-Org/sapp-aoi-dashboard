#!/bin/bash

echo "Sidecar running"
echo "pid is $$"

#check if etcd is up and running
STR='"health": "false"'
STR=$(curl -sb -H "Accept: application/json" "http://etcd:2379/health")
while [[ $STR != *'"health":"true"'* ]]
do
        echo "Waiting for etcd ..."
        STR=$(curl -sb -H "Accept: application/json" "http://etcd:2379/health")
        sleep 1
done


# SIGTERM-handler
term_handler() {
  echo "[Sidecar] Shutting Down"
  exit 143; # 128 + 15 -- SIGTERM
}

# setup handlers
# on callback, kill the last background process, which is `tail -f /dev/null` and execute the specified handler
trap 'kill ${!}; term_handler' SIGTERM SIGINT


#run application
node index.js &

# wait forever
while true
do
  tail -f /dev/null & wait ${!}
done
