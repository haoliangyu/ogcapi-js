/**
 * send get request
 * @param url
 * @param params
 */
export default async function request(
  url: string,
  params: IRequestParams = {}
): Promise<any> {
  const searchParams = new URLSearchParams();
  searchParams.append('f', 'json');

  for (const key in params) {
    searchParams.append(key, params[key].toString());
  }

  const res: Response = await fetch(`${url}?${searchParams.toString()}`, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export interface IRequestParams {
  [key: string]: any;
}
