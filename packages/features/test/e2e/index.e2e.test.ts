import { Service, ICollection } from '../../src/index';

require('isomorphic-fetch');

const TEST_SITE = 'https://demo.ldproxy.net/vineyards';

test('e2e: getConformance() should return a conformance list', async () => {
  const service = new Service({ baseUrl: TEST_SITE });
  const result = await service.getConformance();
  expect(Array.isArray(result.conformsTo)).toBe(true);

  result.conformsTo.forEach((item: string) => {
    expect(typeof item).toBe('string');
  });
});

test('e2e: getCollections() should return an array of collections', async () => {
  const service = new Service({ baseUrl: TEST_SITE });
  const result = await service.getCollections();
  expect(Array.isArray(result.collections)).toBe(true);

  result.collections.forEach((collection: ICollection) => {
    expect(collection.title).toBeTruthy();
  });
});

test('e2e: getCollection() should return a collection', async () => {
  const service = new Service({ baseUrl: TEST_SITE });
  const collection = await service.getCollection('vineyards');

  expect(collection.title).toBeTruthy();
});

test('e2e: getQueryables() should return queryables for collection', async () => {
  const service = new Service({ baseUrl: TEST_SITE });
  const queryables = await service.getQueryables('vineyards');

  expect(queryables.title).toBeTruthy();
  expect(queryables.properties).toBeTruthy();
  expect(queryables.type).toBe('object');
  expect(queryables.$id).toBe(`${TEST_SITE}/collections/vineyards/queryables`);
  expect(
    queryables.$schema === 'https://json-schema.org/draft/2019-09/schema' ||
    queryables.$schema === 'http://json-schema.org/draft-07/schema#'
  ).toBe(true);
});

test('e2e: getFeatures() should return a GeoJSON feature collection', async () => {
  const service = new Service({ baseUrl: TEST_SITE });
  const result = await service.getFeatures('vineyards');

  expect(result.type).toBe('FeatureCollection');
  expect(Array.isArray(result.features)).toBe(true);
});

test('e2e: getFeature() should return a GeoJSON feature', async () => {
  const service = new Service({ baseUrl: TEST_SITE });
  const result = await service.getFeature('vineyards', '460270');

  expect(result.type).toBe('Feature');
  expect(result.id).toBe(460270);
  expect(result.geometry).toBeTruthy();
  expect(result.properties).toBeTruthy();
});
