# Bifrostd

Bring things to another place...

## How it works

### List watches

```sh
$ curl -iv -XGET --unix-socket /tmp/bifrostd.sock http:/path
```

### Expose Details of a watch

```sh
$ curl -iv -XGET --unix-socket /tmp/bifrostd.sock http:/path//tmp/walter
```

### Watch path

```sh
$ curl -iv \
--data '{"path": "/tmp/walter", "namespace": "wally"}' \
-XPOST \
--unix-socket /tmp/bifrostd.sock http:/watch
```

## Install

### `bifrostd` group

```sh
sudo groupadd -g 342 bifrostd --system
```

### Add `bifrostd` to your user

```sh
sudo usermod -a -G bifrostd {username}
```

### Install service

Modify `bifrostd.service` in order to match your local install

```sh
sudo systemctl enable bifrostd.service
```

## Configuration

### Use `host:port`

Change the `httpd` section

```js
{
    "httpd": {
        "host": "0.0.0.0",
        "port:" "8081"
    }
}
```

```sh
curl -iv -XGET http://localhost:8081/path
```

