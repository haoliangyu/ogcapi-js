/**
 * send get request
 * @param url
 * @param params
 */
export async function request({
  url,
  params = {},
  method = 'GET',
}: IRequestOptions): Promise<any> {
  const searchParams = new URLSearchParams();
  searchParams.append('f', 'json');

  for (const key in params) {
    searchParams.append(key, params[key].toString());
  }

  const isGet = method === 'GET';
  const fetchUrl = isGet ? `${url}?${searchParams.toString()}` : url;
  const body = !isGet ? searchParams : undefined;
  const res: Response = await fetch(fetchUrl, {
    method,
    body,
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export interface IRequestParams {
  [key: string]: any;
}

export interface IRequestOptions {
  url: string;
  params?: IRequestParams
  method?: 'GET' | 'POST';
}
