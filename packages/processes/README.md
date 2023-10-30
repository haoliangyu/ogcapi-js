# @ogcapi-js/processes

[![npm](https://img.shields.io/npm/v/@ogcapi-js/processes)](https://www.npmjs.com/package/@ogcapi-js/processes)

A lightweight JavaScript client library for [OGCAPI - Processes](https://github.com/opengeospatial/ogcapi-processes).

This library works with endpoints defined at:
* [OGC API - Processes - Part 1: Core](https://docs.ogc.org/is/18-062r2/18-062r2.html)

See more details at the [documentation](https://haoliangyu.github.io/ogcapi-js).

## Installation

```
npm install @ogcapi-js/processes
```

## Usage

### Node.js

This library uses the global [fetch](https://fetch.spec.whatwg.org/) function for HTTP requests. Please consider using [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch) for polyfill.


``` javascript
require('isomorphic-fetch');

const { ProcessesService } = require('@ogcapi-js/processes');

// create a new service client
const service = new ProcessesService({
  baseUrl: 'https://ogcapi.service.com'
});

// get all processes from the service
const collections = await services.getProcesses();
```

### Browser

Modern browsers already support the global `fetch` function so there is no need to polyfill.

``` javascript
import { ProcessesService } from `@ogcapi-js/processes`;

// create a new service client
const service = new ProcessesService({
  baseUrl: 'https://ogcapi.service.com'
});

// get all processes from the service
const processes = await services.getProcesses();
```
