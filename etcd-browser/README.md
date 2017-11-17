# etcd browser

## Demo
[http://henszey.github.io/etcd-browser/](http://henszey.github.io/etcd-browser/)

## Screen Shot
![etcd-browser Screen Shot](http://henszey.github.io/etcd-browser/images/etcdbrowser.png)

## TODO
* Implement missing features (TTL)

## To build/run as a Docker container:

    docker run --rm --name etcd-browser -p 0.0.0.0:8080:8080 --env ETCD_BROWSER_CONFIG=/app/config.yaml -v config.yaml:/app/config.yaml woosley/etcd-browser

## Using docker-compose

Startup a demo of etcd&etcd-browser locally by running

```
docker-compose up
```

### Configuration

Server side configuration reading from a yaml file, here is a sample

```yaml
listen: 8080
instances:
    etcd01:
        base: http://localhost:2379/v2/keys/
    etcd02:
        verify_ssl: false
        base: https://ssl_host:443/v2/keys/
        auth: user:password
```

by default, configuration file is loaded from ./config.yaml, it can be override
by environment variable `ETCD_BROWSER_CONFIG`
