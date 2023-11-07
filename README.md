# ogcapi-js

A lightweight and modular JavaScript library for [OGC APIs](https://ogcapi.ogc.org/) that implements:

* [@ogcapi-js/features](./packages/features)
* [@ogcapi-js/processes](./packages/processes)

Compared to writing the request code yourself, this library provides:

* More developer-friendly APIs
* Better request error handling
* Query parameter validation
* TypeScript support

See more details at the [documentation](https://haoliangyu.github.io/ogcapi-js).

This library is designed to work in both Node.js and browser environments.

## Testing

The stability of this library is ensured by an extensive collection of unit and E2E tests. The following sections describes how to run those tests locally.

### Unit tests

To run unit tests, execute the following command:

```bash
npm run test
```

### E2E tests

The E2E tests of this library are executed against a specially crafted OGC API instance with pre defined sample datasets based on [pygeoapi](https://pygeoapi.io/), which is provided as a Docker image.

> Note: Further information about the Docker image can be found in the corresponding [Dockerfile](./docker/e2e/Dockerfile).

To run E2E tests locally, first run the following command from the root directory of this repository to start the E2E OGC API test instance:

```bash
docker run --rm -it -p 5000:80 \
          --pull=always \
          --health-cmd "curl http://localhost" \
          --health-interval 10s \
          --health-timeout 5s \
          --health-retries 5 \
          ghcr.io/haoliangyu/ogcapi-js:master
```

After that, run in separate shell the following command to execute E2E tests.

```bash
$ npm run test:e2e
```

## License

MIT
