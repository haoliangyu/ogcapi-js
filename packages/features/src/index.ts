import { stringifyBbox } from './bbox';
import { stringifyDatetime, IDateRange  } from './datetime';
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

      if (options.bboxCrs) {
        requestParams['bbox_crs'] = options.bboxCrs;
      }
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
    options: IGetFeatureOptions = {}
  ): Promise<IFeature> {
    const url: string = `${this._baseUrl}/collections/${collectionId}/items/${featureId}`;
    const requestParams: IRequestParams = Object.assign({}, options.params);

    if (options.crs) {
      requestParams.crs = options.crs;
    }

    const result: IFeature = await request(url, requestParams);
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

  /**
   * the list of CRS identifiers supported by the service
   */
  crs?: string[];

  /**
   * the CRS identifier, from the list of supported CRS identifiers, that may be used to retrieve features from a collection without the need to apply a CRS transformation
   */
  storageCrs?: string;

  /**
   * point in time at which coordinates in the spatial feature collection are referenced to the dynamic coordinate reference system in `storageCrs`, that may be used to retrieve features from a collection without the need to apply a change of coordinate epoch. It is expressed as a decimal year in the Gregorian calendar
   */
  storageCrsCoordinateEpoch?: number;
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

  /**
   * a global list of CRS identifiers that are supported by spatial feature collections offered by the service
   */
  crs: string[];
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
   * the CRS used for the coordinate values of the bbox parameter
   */
  bboxCrs?: string,

  /**
   * feature datetime range
   */
  datetime?: Date | IDateRange;

  /**
   * return CRS for the requested features
   */
  crs?: string;
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

export interface IGetFeatureOptions extends IRequestOptions {
  /**
   * return CRS for the requested feature
   */
  crs?: string;
}