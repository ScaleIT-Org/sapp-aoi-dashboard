
#Error: gitlab Runner "Cannot connect to the Docker daemon. Is 'docker -d' running on this host"

##Verify that gitlab-runner has access to Docker:

sudo -u gitlab-runner -H docker info

##Add gitlab-runner user to docker group:

sudo usermod -aG docker gitlab-runner

