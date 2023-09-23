/**
 * send get request
 * @param url
 * @param params
 */
export async function request({
  url,
  headers = {},
  params = {},
  method = 'GET',
}: IRequestOptions): Promise<any> {
  const isGet = method === 'GET';
  const fetchUrl = isGet ? `${url}?${toSearchParams(params).toString()}` : url;
  const body = !isGet ? toBody(params, headers) : undefined;
  const res: Response = await fetch(fetchUrl, {
    method,
    body,
    headers,
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

const CONTENT_TYPE_HEADER = 'content-type';
const APPLICATION_X_WWW_FORM_URLENCODED = 'application/x-www-form-urlencoded';
const APPLICATION_JSON = 'application/json';

function toBody(params: IRequestParams, headers: IRequestHeaders) {
  const contentType = getContentType(headers).toLowerCase();

  if (contentType.startsWith(APPLICATION_X_WWW_FORM_URLENCODED)) {
    return toSearchParams(params);
  } else if (contentType.startsWith(APPLICATION_JSON)) {
    return toJSON(params);
  }

  return String(params);
}

function getContentType(headers: IRequestHeaders): string {
  const contentType = Object.keys(headers)
    .filter(header => header.toLowerCase() === CONTENT_TYPE_HEADER)
    .map(header => headers[header])[0];

  return typeof contentType === 'string'
    ? contentType
    : APPLICATION_X_WWW_FORM_URLENCODED;
}

function toSearchParams(params: IRequestParams) {
  const searchParams = new URLSearchParams();
  searchParams.append('f', 'json');
  for (const key in params) {
    searchParams.append(key, params[key].toString());
  }
  return searchParams;
}

function toJSON(params: IRequestParams) {
  return JSON.stringify(params);
}
export interface IRequestParams {
  [key: string]: any;
}

export interface IRequestHeaders {
  [key: string]: any;
}

export interface IRequestOptions {
  url: string;
  params?: IRequestParams;
  headers?: IRequestHeaders;
  method?: 'GET' | 'POST';
}
