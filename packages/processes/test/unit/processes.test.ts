import { mockRequest } from '@ogcapi-js/test-utils';
import { IJobInfo, IJobsResponse, IProcess, IProcessesResponse, ProcessesService, TAsyncJobResult, TJobResult, TSyncJobResult } from '../../src/processes';

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

test('getProcesses() should return a list of processes', async function() {
  mockRequest('https://service.com/processes?f=json', {
    processes: [
      {
        id: '1',
        version: '1.0.0',
        title: 'buffer',
        description: 'buffers an input geometry',
        keywords: ['buffer', 'geometry'],
        outputTransmission: ['reference', 'value'],
        jobControlOptions: ['async-execute', 'sync-execute', 'dismiss'],
        links: [],
      },
    ],
    links: [],
  } satisfies IProcessesResponse);

  const service = new ProcessesService({
    baseUrl: 'https://service.com',
  });
  const result = await service.getProcesses();
  expect(result).toEqual({
    processes: [
      {
        id: '1',
        version: '1.0.0',
        title: 'buffer',
        description: 'buffers an input geometry',
        keywords: ['buffer', 'geometry'],
        outputTransmission: ['reference', 'value'],
        jobControlOptions: ['async-execute', 'sync-execute', 'dismiss'],
        links: [],
      },
    ],
    links: [],
  });
});

test('getProcess() should return a single process', async function() {
  mockRequest('https://service.com/processes/1?f=json', {
    id: '1',
    version: '1.0.0',
    title: 'buffer',
    description: 'buffers an input geometry',
    keywords: ['buffer', 'geometry'],
    outputTransmission: ['reference', 'value'],
    jobControlOptions: ['async-execute', 'sync-execute', 'dismiss'],
    links: [],
    inputs: {
      geometryInput: {
        title: 'Geometry input',
        description: 'This is an example of a geometry input.  In this case the geometry can be expressed as a GML of GeoJSON geometry.',
        minOccurs: 2,
        maxOccurs: 5,
        schema: {
          oneOf: [
            {
              type: 'string',
              contentMediaType: 'application/gml+xml; version=3.2',
              contentSchema: 'http://schemas.opengis.net/gml/3.2.1/geometryBasic2d.xsd'
            },
            {
              $ref: 'http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/geometryGeoJSON.json'
            },
          ],
        },
      },
    },
    outputs: {
      geometryOutput: {
        schema: {
          $ref: 'http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/geometryGeoJSON.json'
        },
      },
    },
  } satisfies IProcess);

  const service = new ProcessesService({
    baseUrl: 'https://service.com',
  });
  const result = await service.getProcess("1");
  expect(result).toEqual({
    id: '1',
    version: '1.0.0',
    title: 'buffer',
    description: 'buffers an input geometry',
    keywords: ['buffer', 'geometry'],
    outputTransmission: ['reference', 'value'],
    jobControlOptions: ['async-execute', 'sync-execute', 'dismiss'],
    links: [],
    inputs: {
      geometryInput: {
        title: 'Geometry input',
        description: 'This is an example of a geometry input.  In this case the geometry can be expressed as a GML of GeoJSON geometry.',
        minOccurs: 2,
        maxOccurs: 5,
        schema: {
          oneOf: [
            {
              type: 'string',
              contentMediaType: 'application/gml+xml; version=3.2',
              contentSchema: 'http://schemas.opengis.net/gml/3.2.1/geometryBasic2d.xsd'
            },
            {
              $ref: 'http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/geometryGeoJSON.json'
            },
          ],
        },
      },
    },
    outputs: {
      geometryOutput: {
        schema: {
          $ref: 'http://schemas.opengis.net/ogcapi/features/part1/1.0/openapi/schemas/geometryGeoJSON.json'
        },
      },
    },
  });
});

test('executeProcess({ mode: async }) should return an async job result', async function() {
  mockRequest(
    'https://service.com/processes/1/execution',
    {
      jobID: '1',
      status: 'accepted',
      type: 'process',
      created: '2023-10-27T09:01:58.151Z',
      links: [],
    } satisfies TAsyncJobResult,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'prefer': 'respond-async',
      },
      body: {
        inputs: {
          geometryInput: {
            value: {
              type: 'Polygon',
              coordinates: [
                [
                  [ -176.5814819, -44.10896301 ],
                  [ -176.5818024, -44.10964584 ],
                  [ -176.5844116, -44.11236572 ],
                  [ -176.5935974, -44.11021805 ],
                  [ -176.5973511, -44.10743332 ],
                  [ -176.5950928, -44.10562134 ],
                  [ -176.5858459, -44.1043396  ],
                  [ -176.5811157, -44.10667801 ],
                  [ -176.5814819, -44.10896301 ],
                ],
              ],
            },
            mediaType: 'application/geo+json',
          },
        },
        outputs: {
          geometryInput: {
            transmissionMode: 'reference',
          },
        },
      },
    },
  );

  const service = new ProcessesService({
    baseUrl: 'https://service.com',
  });
  const result = await service.executeProcess('1', {
    mode: 'async',
    inputs: {
      geometryInput: {
        value: {
          type: 'Polygon',
          coordinates: [
            [
              [ -176.5814819, -44.10896301 ],
              [ -176.5818024, -44.10964584 ],
              [ -176.5844116, -44.11236572 ],
              [ -176.5935974, -44.11021805 ],
              [ -176.5973511, -44.10743332 ],
              [ -176.5950928, -44.10562134 ],
              [ -176.5858459, -44.1043396  ],
              [ -176.5811157, -44.10667801 ],
              [ -176.5814819, -44.10896301 ],
            ],
          ],
        },
        mediaType: 'application/geo+json',
      },
    },
    outputs: {
      geometryInput: {
        transmissionMode: 'reference',
      },
    },
  });
  expect(result).toEqual({
    jobID: '1',
    status: 'accepted',
    type: 'process',
    created: '2023-10-27T09:01:58.151Z',
    links: [],
  });
});

test('executeProcess({ mode: sync }) should return a sync job result', async function() {
  mockRequest(
    'https://service.com/processes/1/execution',
    {
      geometryOutput: {
        value: {
          type: 'Polygon',
          coordinates: [
            [
              [ -176.5814819, -44.10896301 ],
              [ -176.5818024, -44.10964584 ],
              [ -176.5844116, -44.11236572 ],
              [ -176.5935974, -44.11021805 ],
              [ -176.5973511, -44.10743332 ],
              [ -176.5950928, -44.10562134 ],
              [ -176.5858459, -44.1043396  ],
              [ -176.5811157, -44.10667801 ],
              [ -176.5814819, -44.10896301 ],
            ],
          ],
        },
        mediaType: 'application/geo+json',
      },
    } satisfies TSyncJobResult,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: {
        inputs: {
          geometryInput: {
            value: {
              type: 'Polygon',
              coordinates: [
                [
                  [ -176.5814819, -44.10896301 ],
                  [ -176.5818024, -44.10964584 ],
                  [ -176.5844116, -44.11236572 ],
                  [ -176.5935974, -44.11021805 ],
                  [ -176.5973511, -44.10743332 ],
                  [ -176.5950928, -44.10562134 ],
                  [ -176.5858459, -44.1043396  ],
                  [ -176.5811157, -44.10667801 ],
                  [ -176.5814819, -44.10896301 ],
                ],
              ],
            },
            mediaType: 'application/geo+json',
          },
        },
        outputs: {
          geometryInput: {
            transmissionMode: 'reference',
          },
        },
      },
    },
  );

  const service = new ProcessesService({
    baseUrl: 'https://service.com',
  });
  const result = await service.executeProcess('1', {
    mode: 'sync',
    inputs: {
      geometryInput: {
        value: {
          type: 'Polygon',
          coordinates: [
            [
              [ -176.5814819, -44.10896301 ],
              [ -176.5818024, -44.10964584 ],
              [ -176.5844116, -44.11236572 ],
              [ -176.5935974, -44.11021805 ],
              [ -176.5973511, -44.10743332 ],
              [ -176.5950928, -44.10562134 ],
              [ -176.5858459, -44.1043396  ],
              [ -176.5811157, -44.10667801 ],
              [ -176.5814819, -44.10896301 ],
            ],
          ],
        },
        mediaType: 'application/geo+json',
      },
    },
    outputs: {
      geometryInput: {
        transmissionMode: 'reference',
      },
    },
  });
  expect(result).toEqual({
    geometryOutput: {
      value: {
        type: 'Polygon',
        coordinates: [
          [
            [ -176.5814819, -44.10896301 ],
            [ -176.5818024, -44.10964584 ],
            [ -176.5844116, -44.11236572 ],
            [ -176.5935974, -44.11021805 ],
            [ -176.5973511, -44.10743332 ],
            [ -176.5950928, -44.10562134 ],
            [ -176.5858459, -44.1043396  ],
            [ -176.5811157, -44.10667801 ],
            [ -176.5814819, -44.10896301 ],
          ],
        ],
      },
      mediaType: 'application/geo+json',
    },
  });
});

test('getJobs() should return a list of jobs', async function() {
  mockRequest('https://service.com/jobs?f=json', {
    jobs: [{
      jobID: '1',
      status: 'accepted',
      type: 'process',
      created: '2023-10-27T09:01:58.151Z',
      message: '',
      finished: '2023-10-27T09:03:52.120Z',
      links: [],
    }],
    links: [],
  } satisfies IJobsResponse);

  const service = new ProcessesService({
    baseUrl: 'https://service.com',
  });
  const result = await service.getJobs();
  expect(result).toEqual({
    jobs: [{
      jobID: '1',
      status: 'accepted',
      type: 'process',
      created: '2023-10-27T09:01:58.151Z',
      message: '',
      finished: '2023-10-27T09:03:52.120Z',
      links: [],
    }],
    links: [],
  });
});

test('getJob() should return a single job', async function() {
  mockRequest('https://service.com/jobs/1?f=json', {
    jobID: '1',
    status: 'accepted',
    type: 'process',
    created: '2023-10-27T09:01:58.151Z',
    message: '',
    finished: '2023-10-27T09:03:52.120Z',
    links: [],
  } satisfies IJobInfo);

  const service = new ProcessesService({
    baseUrl: 'https://service.com',
  });
  const result = await service.getJob("1");
  expect(result).toEqual({
    jobID: '1',
    status: 'accepted',
    type: 'process',
    created: '2023-10-27T09:01:58.151Z',
    message: '',
    finished: '2023-10-27T09:03:52.120Z',
    links: [],
  });
});

test('getJob() should return a single job', async function() {
  mockRequest(
    'https://service.com/jobs/1?f=json',
    {
      jobID: '1',
      status: 'accepted',
      type: 'process',
      created: '2023-10-27T09:01:58.151Z',
      message: '',
      finished: '2023-10-27T09:03:52.120Z',
      links: [],
    } satisfies IJobInfo,
  );

  const service = new ProcessesService({
    baseUrl: 'https://service.com',
  });
  const result = await service.getJob("1");
  expect(result).toEqual({
    jobID: '1',
    status: 'accepted',
    type: 'process',
    created: '2023-10-27T09:01:58.151Z',
    message: '',
    finished: '2023-10-27T09:03:52.120Z',
    links: [],
  });
});

test('getJobResults() should return a jobs results', async function() {
  mockRequest('https://service.com/jobs/1?f=json', {
    stringOutput: 'abc',
    numberOutput: 1234,
    arrayOutput: [1,2,3,4,5,6],
    boundingBoxOutput: {
      bbox: [51.9,7,52,7.1],
      crs: 'http://www.opengis.net/def/crs/OGC/1.3/CRS84',
    },
    imageOutput: {
      href: 'https://www.someserver.com/ogcapi/Daraa/collections/Daraa_DTED/styles/Topographic/coverage?...',
      type: 'application/tiff; application=geotiff',
    },
    complexObjectOutput: {
      value: {
        property1: 'value1',
        property2: 'value2',
        property5: true,
      }
    },
    geometryOutput: {
      value: {
        type: 'Polygon',
        coordinates: [
          [
            [ -176.5814819, -44.10896301 ],
            [ -176.5818024, -44.10964584 ],
            [ -176.5844116, -44.11236572 ],
            [ -176.5935974, -44.11021805 ],
            [ -176.5973511, -44.10743332 ],
            [ -176.5950928, -44.10562134 ],
            [ -176.5858459, -44.1043396  ],
            [ -176.5811157, -44.10667801 ],
            [ -176.5814819, -44.10896301 ],
          ],
        ],
      },
      mediaType: 'application/geo+json',
    },
  } satisfies TJobResult);

  const service = new ProcessesService({
    baseUrl: 'https://service.com',
  });
  const result = await service.getJobResults("1");
  expect(result).toEqual({
    stringOutput: 'abc',
    numberOutput: 1234,
    arrayOutput: [1,2,3,4,5,6],
    boundingBoxOutput: {
      bbox: [51.9,7,52,7.1],
      crs: 'http://www.opengis.net/def/crs/OGC/1.3/CRS84',
    },
    imageOutput: {
      href: 'https://www.someserver.com/ogcapi/Daraa/collections/Daraa_DTED/styles/Topographic/coverage?...',
      type: 'application/tiff; application=geotiff',
    },
    complexObjectOutput: {
      value: {
        property1: 'value1',
        property2: 'value2',
        property5: true,
      }
    },
    geometryOutput: {
      value: {
        type: 'Polygon',
        coordinates: [
          [
            [ -176.5814819, -44.10896301 ],
            [ -176.5818024, -44.10964584 ],
            [ -176.5844116, -44.11236572 ],
            [ -176.5935974, -44.11021805 ],
            [ -176.5973511, -44.10743332 ],
            [ -176.5950928, -44.10562134 ],
            [ -176.5858459, -44.1043396  ],
            [ -176.5811157, -44.10667801 ],
            [ -176.5814819, -44.10896301 ],
          ],
        ],
      },
      mediaType: 'application/geo+json',
    },
  });
});

test('dismissJob() should return dismissed job', async function() {
  mockRequest(
    'https://service.com/jobs/1?f=json',
    {
      jobID: '1',
      status: 'dismissed',
      type: 'process',
      created: '2023-10-27T09:01:58.151Z',
      message: '',
      finished: '2023-10-27T09:03:52.120Z',
      links: [],
    } satisfies IJobInfo,
    {
      method: 'DELETE',
    },
  );

  const service = new ProcessesService({
    baseUrl: 'https://service.com',
  });
  const result = await service.dismissJob("1");
  expect(result).toEqual({
    jobID: '1',
    status: 'dismissed',
    type: 'process',
    created: '2023-10-27T09:01:58.151Z',
    message: '',
    finished: '2023-10-27T09:03:52.120Z',
    links: [],
  });
});