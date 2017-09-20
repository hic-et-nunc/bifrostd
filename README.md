# Bifrostd

Bring things to another place...

## How it works

## List watches

```sh
$ curl -iv -XGET --unix-socket /tmp/bifrostd.sock http:/path
```

## Expose Details of a watch

```sh
$ curl -iv -XGET --unix-socket /tmp/bifrostd.sock http:/path//tmp/walter
```

## Watch path

```sh
$ curl -iv \
--data '{"path": "/tmp/walter", "namespace": "wally"}' \
-XPOST \
--unix-socket /tmp/bifrostd.sock http:/watch
```

