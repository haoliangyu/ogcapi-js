import fetchMock from 'fetch-mock';

export function mockRequest(
  url: string,
  response: any,
  options: any = {}
): any {
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
