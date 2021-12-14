import fetchMock from 'fetch-mock';

export default function mockRequest(url: string, response: any, options: any = {}): any {
  fetchMock.mock(
    {
      url,
      method: 'GET',
      overwriteRoutes: true,
      ...options,
    },
    response
  );
}
