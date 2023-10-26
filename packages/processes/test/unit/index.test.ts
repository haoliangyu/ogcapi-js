import { mockRequest } from '@ogcapi-js/test-utils';
import { ProcessesService } from '../../src/index';


test('getConformance() should return a list of conformances', async function() {
  mockRequest('https://service.com/conformance?f=json', {
    conformsTo: ['test'],
  });

  const service = new ProcessesService({
    baseUrl: 'https://service.com',
  });
  const result = await service.getConformance();
  expect(result.conformsTo).toEqual(['test']);
});

/* test('getConformance() should return a list of conformances', async function() {
  mockRequest('https://service.com/conformance?f=json', {
    conformsTo: ['test'],
  });

  const service = new ProcessesService({
    baseUrl: 'https://service.com',
  });
  const result = await service.executeProcess('test', { inputs: {}, outputs: {} });
}); */