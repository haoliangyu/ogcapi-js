import {
  ICollection,
  IFeature,
  IGetCollectionsResponse,
  IGetConformanceResponse,
  IGetFeaturesParameters,
  IGetFeaturesResponse,
  IGetFeatureParameters,
} from './types';
import { stringify as stringifyBbox } from './utils/bbox';
import { stringify as stringifyDatetime } from './utils/datetime';
import request, { IRequestParams } from './request';

/**
 *
 */
export class Service {
  /**
   *
   */
  baseUrl: string;

  /**
   *
   * @param baseUrl
   */
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   *
   */
  async getConformance(): Promise<string[]> {
    const url: string = `${this.baseUrl}/conformance`;
    const result: IGetConformanceResponse = await request(url);
    return result.conformsTo;
  }

  /**
   *
   */
  async getCollections(): Promise<ICollection[]> {
    const url: string = `${this.baseUrl}/collections`;
    const result: IGetCollectionsResponse = await request(url);
    return result.collections;
  }

  /**
   *
   * @param collectionId
   */
  async getCollection(collectionId: string): Promise<ICollection> {
    const url: string = `${this.baseUrl}/collections/${collectionId}`;
    const result: ICollection = await request(url);
    return result;
  }

  /**
   * get features from a collection
   * @param params
   */
  async getFeatures(
    params: IGetFeaturesParameters
  ): Promise<IGetFeaturesResponse> {
    const collectionId = params.collectionId;
    const requestParams: IRequestParams = {};

    if (params.bbox) {
      requestParams.bbox = stringifyBbox(params.bbox);
    }

    if (params.datetime) {
      requestParams.datetime = stringifyDatetime(params.datetime);
    }

    // should take care of 0
    if ('limit' in params) {
      requestParams.limit = params.limit;
    }

    const url: string = `${this.baseUrl}/collections/${collectionId}/items`;
    const result: IGetFeaturesResponse = await request(url, requestParams);
    return result;
  }

  /**
   * get a feature from a collection
   * @param params
   */
  async getFeature(params: IGetFeatureParameters): Promise<IFeature> {
    const { collectionId, featureId } = params;
    const url: string = `${this.baseUrl}/collections/${collectionId}/items/${featureId}`;
    const result: IFeature = await request(url);
    return result;
  }
}
