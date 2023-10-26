import { IRequestParams, request } from "./request";

/**
 * link
 */
export interface ILink {
  /**
   * link href
   */
  href: string;

  /**
   * link ref
   */
  rel: string;

  /**
   * link type
   */
  type: string;

  /**
   * link title
   */
  title: string;
}


export interface IServiceConfig {
  baseUrl: string;
}

/**
 * request options
 */
export interface IServiceRequestOptions {
  /**
   * additional request parameters
   */
  params?: IRequestParams;
}

/**
 * response for the get conformance request
 */
export interface IGetConformanceResponse {
  /**
   * conform array
   */
  conformsTo: string[];
}

export class Service {
  protected _baseUrl: string;

  /**
   * constructor
   */
  constructor(config: IServiceConfig) {
    this._baseUrl = config.baseUrl;
  }

  /**
   * Get a list of conformed standards
   * @param options       options
   */
  async getConformance(
    options: IServiceRequestOptions = {}
  ): Promise<IGetConformanceResponse> {
    const url: string = `${this._baseUrl}/conformance`;
    const result: IGetConformanceResponse = await request({
      url,
      params: options.params,
    });
    return result;
  }
}
