import 'isomorphic-fetch';
import {
  /* IProcess, */
  IProcessSummary,
  ProcessesService,
} from '../../src/processes';

const TEST_SITE = 'https://demo.pygeoapi.io/stable/';
// const TEST_SITE = 'http://localhost:5000';
// const TEST_SITE = 'http://tb17.geolabs.fr:8119/ogc-api/';

test('e2e: getConformance() should return a conformance list', async () => {
  const service = new ProcessesService({ baseUrl: TEST_SITE });
  const result = await service.getConformance();
  expect(Array.isArray(result.conformsTo)).toBe(true);

  result.conformsTo.forEach((item: string) => {
    expect(typeof item).toBe('string');
  });
});

test('e2e: getProcesses() should return a processes list', async () => {
  const service = new ProcessesService({ baseUrl: TEST_SITE });
  const result = await service.getProcesses();
  expect(Array.isArray(result.processes)).toBe(true);

  result.processes.forEach((item: IProcessSummary) => {
    expect(item.id).toBeTruthy();
    expect(item.version).toBeTruthy();
    expect(item.title).toBeTruthy();
  });
});

test('e2e: getProcess() should return a process', async () => {
  const service = new ProcessesService({ baseUrl: TEST_SITE });
  const process = await service.getProcess('hello-world');

  expect(process.id).toBeTruthy();
  expect(process.version).toBeTruthy();
  expect(process.title).toBeTruthy();
});

test('e2e: executeJob() should execute job synchronously', async () => {
  const service = new ProcessesService({ baseUrl: TEST_SITE });
  const result = await service.executeProcess('hello-world', {
    mode: 'sync',
    inputs: {
      name: '@ogcapi-js'
    },
    outputs: {
      echo: {
        transmissionMode: 'value',
      },
    },
    response: 'document',
  });

  expect(result).toBeTruthy();
  // TODO add more assertions when https://github.com/geopython/pygeoapi/discussions/1383 is resolved
});

// TODO: check again when https://github.com/geopython/pygeoapi/discussions/1383#discussioncomment-7421781 is resolved
/* test('e2e: executeJob() should execute job asynchronously', async () => {
  const service = new ProcessesService({ baseUrl: TEST_SITE });
  const result = await service.executeProcess('hello-world', {
    mode: 'async',
    inputs: {
      name: '@ogcapi-js'
    },
    outputs: {
      echo: {
        transmissionMode: 'value',
      },
    },
    response: 'document',
  });

  console.info({ result });

  expect(result).toBeTruthy();
}); */


test('e2e: getJobs() should return a jobs list', async () => {
  const service = new ProcessesService({ baseUrl: TEST_SITE });
  const result = await service.getJobs();

  expect(Array.isArray(result.jobs)).toBe(true);
});

/*
// TODO: check again when https://github.com/ZOO-Project/ZOO-Project/issues/72 is resolved
/* test('e2e: executeJob() should execute job synchronously', async () => {
  const service = new ProcessesService({ baseUrl: TEST_SITE });
  const result = await service.executeProcess('SAGA.garden_fractals.1', {
    mode: 'sync',
    inputs: {
      TYPE: 'Polygons',
      ANGLE: '55',
      MINSIZE: '2',
      METHOD: 'Fixed angle',
    },
    outputs: {
      RESULT: {
        format: {
          mediaType: 'application/json',
        },
        transmissionMode: 'value',
      },
    },
  });

  expect(result.RESULT).toBeTruthy();
  expect((result.RESULT as any).value.type).toBe('FeatureCollection');
});
*/

// TODO: check again when xxx is resolved https://github.com/ZOO-Project/ZOO-Project/issues/72
/* test('e2e: executeJob() should execute job asynchronously', async () => {
  const service = new ProcessesService({ baseUrl: TEST_SITE });
  const result = await service.executeProcess('SAGA.garden_fractals.1', {
    mode: 'async',
    inputs: {
      TYPE: 'Polygons',
      ANGLE: '55',
      MINSIZE: '2',
      METHOD: 'Fixed angle',
    },
    outputs: {
      RESULT: {
        format: {
          mediaType: 'application/json',
        },
        transmissionMode: 'value',
      },
    },
  });

  expect(result.jobID).toBeTruthy();
});
*/

