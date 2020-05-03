import { Service } from '../src';

const TEST_SITE = 'https://www.ldproxy.nrw.de/topographie';

test('e2e: getConformance() should return a conformance list', async () => {
  const service = new Service(TEST_SITE);
  const results = await service.getConformance();
  expect(Array.isArray(results)).toBe(true);

  results.forEach ((item) => {
    expect(typeof item).toBe('string');
  });
});

test('e2e: getCollections() should return an array of collections', async () => {
  const service = new Service(TEST_SITE);
  const results = await service.getCollections();
  expect(Array.isArray(results)).toBe(true);

  results.forEach((collection) => {
    expect(collection.title).toBeTruthy();
  });
});

test('e2e: getCollection() should return a collection', async () => {
  const service = new Service(TEST_SITE);
  const collection = await service.getCollection('ax_bahnverkehrsanlage');

  expect(collection.title).toBeTruthy();
});

test('e2e: getFeatures() should return a GeoJSON feature collection', async () => {
  const service = new Service(TEST_SITE);
  const result = await service.getFeatures({
    collectionId: 'ax_bahnverkehrsanlage'
  });

  expect(result.type).toBe('FeatureCollection');
  expect(Array.isArray(result.features)).toBe(true);
})

test('e2e: getFeature() should return a GeoJSON feature', async () => {
  const service = new Service(TEST_SITE);
  const result = await service.getFeature({
    collectionId: 'ax_bahnverkehrsanlage',
    featureId: 'DENWAT01D000Abbi'
  });

  expect(result.type).toBe('Feature');
  expect(result.geometry).toBeTruthy();
  expect(result.properties).toBeTruthy();
})