import request from '../../src/request';
import mockRequest from '../mock-request';

test('request() should send a GET request with f=json', async () => {
  mockRequest('https://www.example.com?f=json', {
    success: true
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
    success: true
  });

  const result = await request('https://www.example.com', {
    test: true,
    num: 1,
    content: 'test'
  });
  expect(result.success).toBe(true);
});