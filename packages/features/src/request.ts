import fetch from 'cross-fetch';

/**
 * send get request
 * @param url
 * @param params
 */
export default async function request(
  url: string,
  params: IRequestParams = {}
): Promise<any> {
  const requestUrl = new URL(url);
  requestUrl.searchParams.set('f', 'json');

  for (const key in params) {
    requestUrl.searchParams.set(
      key,
      encodeURIComponent(params[key].toString())
    );
  }

  const res: Response = await fetch(requestUrl.href, {
    method: 'GET',
  });

  return res.json();
}

export interface IRequestParams {
  [key: string]: any;
}
