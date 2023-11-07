import 'isomorphic-fetch';
import { IProcessSummary, ProcessesService } from '../../src/processes';

const TEST_SITE = 'http://localhost:5000';

test('e2e: getConformance() should return a conformance list', async () => {
  const service = new ProcessesService({ baseUrl: TEST_SITE });
  const result = await service.getConformance();

  expect(result).toBeDefined();
  expect(Array.isArray(result.conformsTo)).toBe(true);
  expect(result.conformsTo.length).toBeGreaterThan(0);

  result.conformsTo.forEach((item: string) => {
    expect(typeof item).toBe('string');
  });
});

test('e2e: getProcesses() should return a processes list', async () => {
  const service = new ProcessesService({ baseUrl: TEST_SITE });
  const result = await service.getProcesses();

  expect(result).toBeDefined();
  expect(Array.isArray(result.processes)).toBe(true);
  expect(result.processes.length).toBeGreaterThan(0);

  result.processes.forEach((item: IProcessSummary) => {
    expect(typeof item.id).toBe('string');
    expect(typeof item.version).toBe('string');
    expect(typeof item.title).toBe('string');
  });
});

test('e2e: getProcess() should return a process', async () => {
  const service = new ProcessesService({ baseUrl: TEST_SITE });
  const process = await service.getProcess('hello-world');

  expect(process).toBeDefined();
  expect(process.id).toBe('hello-world');
  expect(process.title).toBe('Hello World');
  expect(typeof process.description).toBe('string');
  expect(typeof process.version).toBe('string');
  expect(process.inputs).toBeDefined();
  expect(process.outputs).toBeDefined();
  expect(process.jobControlOptions).toContain('sync-execute');
  expect(process.jobControlOptions).toContain('async-execute');
  expect(process.outputTransmission).toContain('value');
  expect(Array.isArray(process.links)).toBe(true);
});

test('e2e: executeJob({ mode: sync }) should execute job synchronously', async () => {
  const service = new ProcessesService({ baseUrl: TEST_SITE });
  const result = await service.executeProcess('hello-world', {
    mode: 'sync',
    inputs: {
      name: '@ogcapi-js',
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
/* test('e2e: executeJob({ mode: async }) should execute job asynchronously', async () => {
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

  expect(result).toBeDefined();
  expect(Array.isArray(result.jobs)).toBe(true);
  expect(result.jobs.length).toBeGreaterThan(0);

  result.jobs.forEach(job => {
    expect(typeof job.processID).toBe('string');
    expect(typeof job.status).toBe('string');
    expect(typeof job.jobID).toBe('string');
  });
});

test('e2e: getJob() should return a job', async () => {
  const service = new ProcessesService({ baseUrl: TEST_SITE });
  const result = await service.getJob('f78fa304-775f-11ee-88b4-0242ac110002');

  expect(result).toBeDefined();
  expect(result.processID).toBe('hello-world');
  expect(result.status).toBe('successful');
  expect(result.jobID).toBe('f78fa304-775f-11ee-88b4-0242ac110002');
});
