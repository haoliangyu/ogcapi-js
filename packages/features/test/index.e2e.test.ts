import { Service } from '../src';

const TEST_SITE = 'https://www.ldproxy.nrw.de/topographie';

test('it should return conformance list', async () => {
  const service = new Service(TEST_SITE);
  const result = await service.getConformance();
  expect(Array.isArray(result)).toBe(true);
});
