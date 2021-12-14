import { Service, FilterLang } from '../../src/index';
import mockRequest from '../mock-request';

test('getConformance() should return a list of conformances', async function() {
  mockRequest('https://service.com/conformance?f=json', {
    conformsTo: ['test'],
  });

  const service = new Service({
    baseUrl: 'https://service.com',
  });
  const result = await service.getConformance();
  expect(result.conformsTo).toEqual(['test']);
});

test('getCollections() should return a list of collections', async function() {
  mockRequest('https://service.com/collections?f=json', {
    collections: [{ id: 'test', links: [] }],
  });

  const service = new Service({
    baseUrl: 'https://service.com',
  });
  const result = await service.getCollections();
  expect(result.collections).toEqual([{ id: 'test', links: [] }]);
});

test('getCollection() should return a collection', async function() {
  mockRequest('https://service.com/collections/test?f=json', {
    id: 'test',
    links: [],
  });

  const service = new Service({
    baseUrl: 'https://service.com',
  });
  const result = await service.getCollection('test');
  expect(result).toEqual({ id: 'test', links: [] });
});

test('getFeatures() should fetch features with parameters', async function() {
  mockRequest(
    'https://service.com/collections/test/items',
    {
      type: 'FeatureCollection',
      features: [],
    },
    {
      query:  {
        f: "json",
        limit: "1",
        bbox: "1,2,3,4",
        "bbox-crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84",
        datetime: "2021-12-21T00:00:00.000Z",
        properties: "PROPERTY_A,PROPERTY_B",
        sortby: "PROPERTY_A,-PROPERTY_B",
        filter: "PROPERTY_A = 3",
        "filter-lang": "cql-text",
        "filter-crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84",
      },
    }
  );

  const service = new Service({
    baseUrl: 'https://service.com',
  });
  const result = await service.getFeatures('test', {
    bbox: [1, 2, 3, 4],
    bboxCrs: 'http://www.opengis.net/def/crs/OGC/1.3/CRS84',
    limit: 1,
    datetime: new Date('2021-12-21T00:00:00.000Z'),
    properties: ['PROPERTY_A', 'PROPERTY_B'],
    sortby: ['PROPERTY_A', '-PROPERTY_B'],
    filter: 'PROPERTY_A = 3',
    filterLang: FilterLang.TEXT,
    filterCrs: 'http://www.opengis.net/def/crs/OGC/1.3/CRS84'
  });
  expect(result).toEqual({
    type: 'FeatureCollection',
    features: [],
  });
});
test('getFeature() should fetch a feature', async function() {
  mockRequest('https://service.com/collections/test/items/a?f=json', {
    type: 'Feature',
    geometry: {},
  });

  const service = new Service({
    baseUrl: 'https://service.com',
  });
  const result = await service.getFeature('test', 'a');
  expect(result).toEqual({
    type: 'Feature',
    geometry: {},
  });
});

test('getFeature() should fetch a feature with parameters', async function () {
  mockRequest(
    'https://service.com/collections/test/items/a',
    {
      type: 'Feature',
      geometry: {},
    },
    {
      query: {
        f: 'json',
        crs: 'http://www.opengis.net/def/crs/OGC/1.3/CRS84'
      }
    }
  );

  const service = new Service({
    baseUrl: 'https://service.com',
  });
  const result = await service.getFeature('test', 'a', {
    crs: 'http://www.opengis.net/def/crs/OGC/1.3/CRS84'
  });
  expect(result).toEqual({
    type: 'Feature',
    geometry: {},
  });
});

test('it could use a relative path for a local service', async function () {
  mockRequest(
    '/my-service/collections/test/items/a',
    {
      type: 'Feature',
      geometry: {},
    },
    {
      query: {
        f: 'json',
        crs: 'http://www.opengis.net/def/crs/OGC/1.3/CRS84'
      }
    }
  );

  const service = new Service({
    baseUrl: '/my-service',
  });
  const result = await service.getFeature('test', 'a', {
    crs: 'http://www.opengis.net/def/crs/OGC/1.3/CRS84'
  });
  expect(result).toEqual({
    type: 'Feature',
    geometry: {},
  });
})