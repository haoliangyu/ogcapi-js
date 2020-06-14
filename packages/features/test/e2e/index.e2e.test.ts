import { Service, ICollection } from '../../src/index';

require('isomorphic-fetch');

const TEST_SITE = 'https://www.ldproxy.nrw.de/topographie';

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
  const collection = await service.getCollection('ax_bahnverkehrsanlage');

  expect(collection.title).toBeTruthy();
});

test('e2e: getFeatures() should return a GeoJSON feature collection', async () => {
  const service = new Service({ baseUrl: TEST_SITE });
  const result = await service.getFeatures('ax_bahnverkehrsanlage');

  expect(result.type).toBe('FeatureCollection');
  expect(Array.isArray(result.features)).toBe(true);
});

test('e2e: getFeature() should return a GeoJSON feature', async () => {
  const service = new Service({ baseUrl: TEST_SITE });
  const result = await service.getFeature(
    'ax_bahnverkehrsanlage',
    'DENWAT01D000Abbi'
  );

  expect(result.type).toBe('Feature');
  expect(result.geometry).toBeTruthy();
  expect(result.properties).toBeTruthy();
});
