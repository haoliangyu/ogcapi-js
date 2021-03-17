import request from '../../src/request';
import mockRequest from '../mock-request';

test('request() should send a GET request with f=json', async () => {
  mockRequest('https://www.example.com?f=json', {
    success: true,
  });

  const result = await request('https://www.example.com');
  expect(result.success).toBe(true);
});

test('request() should throw the request error', async () => {
  mockRequest('https://www.example.com?f=json', 500);

  try {
    await request('https://www.example.com');
    expect(true).toBe(false);
  } catch (error) {
    expect(error.message).toBe('Internal Server Error');
  }
});

test('request() should accept additional parameters', async () => {
  mockRequest('https://www.example.com?f=json&test=true&num=1&content=test', {
    success: true,
  });

  const result = await request('https://www.example.com', {
    test: true,
    num: 1,
    content: 'test',
  });
  expect(result.success).toBe(true);
});

test('request() should accept date formatted parameter', async () => {
  mockRequest('https://www.example.com?f=json&datetime=2014-01-01T00%3A00%3A00.000Z%2F2014-01-02T00%3A00%3A00.000Z', {
    success: true,
  });

  const result = await request('https://www.example.com', {
    datetime: '2014-01-01T00:00:00.000Z/2014-01-02T00:00:00.000Z',
  });
  expect(result.success).toBe(true);
});