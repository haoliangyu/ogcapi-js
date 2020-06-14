import { stringifyBbox } from './bbox';
import { stringifyDatetime, IDateRange } from './datetime';
import request, { IRequestParams } from './request';
import { FeatureCollection, Feature } from 'geojson';

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
  private _baseUrl: string;

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
   * Get a list of conformed standards
   * @param options       options
   */
  async getConformance(options: IRequestOptions = {}): Promise<IGetConformanceResponse> {
    const url: string = `${this._baseUrl}/conformance`;
    const result: IGetConformanceResponse = await request(url, options.params);
    return result;
  }

  /**
   * Get a list of feature collections
   * @param options       options
   */
  async getCollections(options: IRequestOptions = {}): Promise<IGetCollectionsResponse> {
    const url: string = `${this._baseUrl}/collections`;
    const result: IGetCollectionsResponse = await request(url, options.params);
    return result;
  }

  /**
   * Get a feature coolection by id
   * @param collectionId collection id
   * @param options       options
   */
  async getCollection(collectionId: string, options: IRequestOptions = {}): Promise<ICollection> {
    const url: string = `${this._baseUrl}/collections/${collectionId}`;
    const result: ICollection = await request(url, options.params);
    return result;
  }

  /**
   * Get features from a collection by id
   * @param collectionId  collection id
   * @param options       options
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
   * Get a feature from a collection by id
   * @param collectionId  collection id
   * @param featureId     feature id
   * @param options       options
   */
  async getFeature(
    collectionId: string,
    featureId: string,
    options: IRequestOptions = {}
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

/**
 * request options
 */
export interface IRequestOptions {
  /**
   * additional request parameters
   */
  params?: IRequestParams;
}

/**
 * collection metadata
 */
export interface ICollection {
  /**
   * identifier of the collection used, for example, in URIs
   */
  id: string;

  /**
   * human readable title of the collection
   */
  title?: string;

  /**
   * a description of the features in the collection
   */
  description?: string;

  /**
   * indicator about the type of the items in the collection (the default value is 'feature')
   */
  itemType?: string;

  /**
   * links
   */
  links: ILink[];
}

export interface IFeatures extends FeatureCollection { }

/**
 * collection feature
 */
export interface IFeature extends Feature {
  /**
   * feature id
   */
  id: string;

  /**
   * links
   */
  links: ILink[];
}

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

/**
 * response for the get conformance request
 */
export interface IGetConformanceResponse {
  /**
   * conform array
   */
  conformsTo: string[];
}

/**
 * response for the get collections request
 */
export interface IGetCollectionsResponse {
  /**
   * collections
   */
  collections: ICollection[];

  /**
   * links
   */
  links: ILink[];
}

/**
 * request parameters to get features from a collection
 */
export interface IGetFeaturesOptions extends IRequestOptions {
  /**
   * number of features to return
   */
  limit?: number;

  /**
   * feature bounding box
   */
  bbox?: number[];

  /**
   * feature datetime range
   */
  datetime?: Date | IDateRange;
}

/**
 * request response for get features request
 */
export interface IGetFeaturesResponse extends IFeatures {
  /**
   * links
   */
  links: ILink[];

  /**
   * response time
   */
  timeStamp: string;

  /**
   * number of features matched the request query
   */
  numberMatched: number;

  /**
   * number of features returned
   */
  numberReturned: number;
}