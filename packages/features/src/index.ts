import {
  ICollection,
  IFeature,
  IGetCollectionsResponse,
  IGetConformanceResponse,
  IGetFeaturesParameters,
  IGetFeaturesResponse,
  IGetFeatureParameters
} from './types';
import request, { requestParams } from './request';

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
  constructor (baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   *
   */
  async getConformance (): Promise<string[]> {
    const url: string = `${this.baseUrl}/conformance`;
    const res: Response = await request(url);
    const result: IGetConformanceResponse = await res.json();
    return result.conformsTo;
  }

  /**
   *
   */
  async getCollections (): Promise<ICollection[]> {
    const url: string = `${this.baseUrl}/collections`;
    const res: Response = await request(url);
    const result: IGetCollectionsResponse = await res.json();
    return result.collections;
  }

  /**
   *
   * @param collectionId
   */
  async getCollection (collectionId: string): Promise<ICollection> {
    const url: string = `${this.baseUrl}/collections/${collectionId}`;
    const res: Response = await request(url);
    const result: ICollection = await res.json();
    return result;
  }

  /**
   * get features from a collection
   * @param params
   */
  async getFeatures(params: IGetFeaturesParameters): Promise<IGetFeaturesResponse> {
    const collectionId = params.collectionId;
    const requestParams: requestParams = {};

    if ('bbox' in params) {
      requestParams.bbox = params.bbox;
    }

    if ('datetime' in params) {
      requestParams.datetime = params.datetime;
    }

    if ('limit' in params) {
      requestParams.limit = params.limit;
    }

    const url: string = `${this.baseUrl}/collections/${collectionId}/items`;
    const res: Response = await request(url, requestParams);
    const result: IGetFeaturesResponse = await res.json();
    return result;
  }

  /**
   * get a feature from a collection
   * @param params
   */
  async getFeature(params: IGetFeatureParameters): Promise<IFeature> {
    const { collectionId, featureId } = params;
    const url: string = `${this.baseUrl}/collections/${collectionId}/items/${featureId}`;
    const res: Response = await request(url);
    const result: IFeature = await res.json();
    return result;
  }
}
