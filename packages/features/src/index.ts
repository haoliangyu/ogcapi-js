import {
  ICollection,
  IFeature,
  IGetCollectionsResponse,
  IGetConformanceResponse,
  IGetFeaturesOptions,
  IGetFeaturesResponse,
  IGetFeatureOptions,
} from './types';
import { stringify as stringifyBbox } from './utils/bbox';
import { stringify as stringifyDatetime } from './utils/datetime';
import request, { IRequestParams } from './request';

/**
 * configuration for a OGC Features API service
 */
export interface IServiceConfig {
  /**
   * service base url
   */
  baseUrl: string;
}

/**
 * OGC Features API service class
 */
export class Service {
  _baseUrl: string;

  /**
   * constructor
   */
  constructor(config: IServiceConfig) {
    if (!isUrl(config.baseUrl)) {
      throw new Error('invalid base url');
    }

    this._baseUrl = config.baseUrl;
  }

  /**
   *
   */
  async getConformance(): Promise<IGetConformanceResponse> {
    const url: string = `${this._baseUrl}/conformance`;
    const result: IGetConformanceResponse = await request(url);
    return result;
  }

  /**
   *
   */
  async getCollections(): Promise<IGetCollectionsResponse> {
    const url: string = `${this._baseUrl}/collections`;
    const result: IGetCollectionsResponse = await request(url);
    return result;
  }

  /**
   *
   * @param collectionId
   */
  async getCollection(collectionId: string): Promise<ICollection> {
    const url: string = `${this._baseUrl}/collections/${collectionId}`;
    const result: ICollection = await request(url);
    return result;
  }

  /**
   * get features from a collection
   * @param params
   */
  async getFeatures(
    collectionId: string,
    options: IGetFeaturesOptions = {}
  ): Promise<IGetFeaturesResponse> {
    const requestParams: IRequestParams = Object.assign({}, options.params);

    if (options.bbox) {
      requestParams.bbox = stringifyBbox(options.bbox);
    }

    if (options.datetime) {
      requestParams.datetime = stringifyDatetime(options.datetime);
    }

    // should take care of 0
    if ('limit' in options) {
      requestParams.limit = options.limit;
    }

    const url: string = `${this._baseUrl}/collections/${collectionId}/items`;
    const result: IGetFeaturesResponse = await request(url, requestParams);
    return result;
  }

  /**
   * get a feature from a collection
   * @param params
   */
  async getFeature(
    collectionId: string,
    featureId: string,
    options: IGetFeatureOptions = {}
  ): Promise<IFeature> {
    const url: string = `${this._baseUrl}/collections/${collectionId}/items/${featureId}`;
    const result: IFeature = await request(url, options.params);
    return result;
  }
}

function isUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch (error) {
    return false;
  }
}
