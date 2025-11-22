# @ogcapi-js/records

[![npm](https://img.shields.io/npm/v/@ogcapi-js/processes)](https://www.npmjs.com/package/@ogcapi-js/processes)

A lightweight JavaScript client library for [OGCAPI - Records](https://github.com/opengeospatial/ogcapi-records).

This library works with endpoints defined at:
* [OGC API - Records - Part 1: Core](https://docs.ogc.org/is/20-004r1/20-004r1.html)

See more details at the [documentation](https://haoliangyu.github.io/ogcapi-js).

## Installation

```
npm install @ogcapi-js/records
```

## Usage

### Node.js

This library uses the global [fetch](https://fetch.spec.whatwg.org/) function for HTTP requests.


``` javascript
const { RecordsService } = require('@ogcapi-js/records');

// create a new service client
const service = new RecordsService({ baseUrl: 'https://ogcapi.service.com' });

// list collections
const collections = await service.collections();

console.log(collections);
```

### Browser

``` javascript
import { RecordsService } from '@ogcapi-js/records';

// create a new service client
const service = new RecordsService({ baseUrl: 'https://ogcapi.service.com' });

// example: get collection items
async function showItems() {
  try {
    const items = await service.items('my-collection', { limit: 10 });
    console.log(items);
  } catch (err) {
    console.error(err);
  }
}

showItems();

```
