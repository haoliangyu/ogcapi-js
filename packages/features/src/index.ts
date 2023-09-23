import {
  EFilterLang,
  IDateRange,
  IRequestParams,
  TFilter,
  TSortBy,
  request,
  stringifyBbox,
  stringifyBboxCrs,
  stringifyCrs,
  stringifyDatetime,
  stringifyFilter,
  stringifyProperties,
  stringifySortBy,
} from '@ogcapi-js/shared';
import { Feature, FeatureCollection } from 'geojson';
import { JSONSchema7 } from 'json-schema';

// re-export constants, interfaces and types for better user compatibility
export {
  EFilterLang as FilterLang,
  IDateRange,
  IJSONFilter,
  IRequestParams,
  ISortByItem,
  TFilter,
  TSortBy,
  TTextFilter,
} from '@ogcapi-js/shared';

/**
 * configuration for a OGC Features API service
 */
export interface IFeatureServiceConfig {
  /**
   * service base url
   */
  baseUrl: string;
}

/**
 * OGC Features API service class
 */
export class FeatureService {
  private _baseUrl: string;

  /**
   * constructor
   */
  constructor(config: IFeatureServiceConfig) {
    this._baseUrl = config.baseUrl;
  }

  /**
   * Get a list of conformed standards
   * @param options       options
   */
  async getConformance(
    options: IRequestOptions = {}
  ): Promise<IGetConformanceResponse> {
    const url: string = `${this._baseUrl}/conformance`;
    const result: IGetConformanceResponse = await request({
      url,
      params: options.params,
    });
    return result;
  }

  /**
   * Get a list of feature collections
   * @param options       options
   */
  async getCollections(
    options: IRequestOptions = {}
  ): Promise<IGetCollectionsResponse> {
    const url: string = `${this._baseUrl}/collections`;
    const result: IGetCollectionsResponse = await request({
      url,
      params: options.params,
    });
    return result;
  }

  /**
   * Get a feature collection by id
   * @param collectionId collection id
   * @param options       options
   */
  async getCollection(
    collectionId: string,
    options: IRequestOptions = {}
  ): Promise<ICollection> {
    const url: string = `${this._baseUrl}/collections/${collectionId}`;
    const result: ICollection = await request({ url, params: options.params });
    return result;
  }

  /**
   * Get queryables from a collection by id
   * @param collectionId collection id
   * @param options       options
   */
  async getQueryables(
    collectionId: string,
    options: IRequestOptions = {}
  ): Promise<IQueryables> {
    const url: string = `${this._baseUrl}/collections/${collectionId}/queryables`;
    const result: IQueryables = await request({ url, params: options.params });
    return result;
  }

  /**
   * Get features from a collection
   * @param collectionId  collection id
   * @param options       options
   */
  async getFeatures(
    collectionId: string,
    options: IGetFeaturesOptions = {}
  ): Promise<IGetFeaturesResponse> {
    const params = toGetFeaturesRequestParams(options);
    const url: string = `${this._baseUrl}/collections/${collectionId}/items`;
    const result: IGetFeaturesResponse = await request({
      url,
      params,
    });
    return result;
  }

  /**
   * Search features from a collection
   * @param collectionId  collection id
   * @param featureId     feature id
   */
  async searchFeatures(
    collectionId: string,
    options: IGetFeaturesOptions = {}
  ): Promise<IGetFeaturesResponse> {
    const params = toGetFeaturesRequestParams(options);
    const url: string = `${this._baseUrl}/collections/${collectionId}/search`;
    const result: IGetFeaturesResponse = await request({
      url,
      params,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    });
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
    const params = toGetFeatureRequestParams(options);
    const url: string = `${this._baseUrl}/collections/${collectionId}/items/${featureId}`;
    const result: IFeature = await request({ url, params });
    return result;
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

/**
 * collection queryables
 */
export interface IQueryables extends JSONSchema7 {}

/**
 * collection features
 */
export interface IFeatures extends FeatureCollection {}

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
  crs?: string[];
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
  bboxCrs?: string;

  /**
   * feature datetime range
   */
  datetime?: Date | IDateRange;

  /**
   * return CRS for the requested features
   */
  crs?: string;

  /**
   * properties to include for the requested features
   */
  properties?: string | string[];

  /**
   * sorting direction in which features should be returned
   */
  sortby?: TSortBy;

  /**
   * CQL filter expression
   */
  filter?: TFilter;

  /**
   * CQL filter expression language
   */
  filterLang?: EFilterLang;

  /**
   * the CRS used for coordinate values in CQL spatial filter expressions
   */
  filterCrs?: string;
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

/**
 * utility, which stringifies IGetFeatureOptions.
 *
 * @internal
 */
function toGetFeatureRequestParams(options: IGetFeatureOptions) {
  const params: IRequestParams = Object.assign({}, options.params);

  if (options.crs) {
    params.crs = stringifyCrs(options.crs);
  }

  return params;
}

/**
 * utility, which stringifies IGetFeaturesOptions.
 *
 * @internal
 */
function toGetFeaturesRequestParams(options: IGetFeaturesOptions) {
  const params: IRequestParams = Object.assign({}, options.params);

  if (options.crs) {
    params.crs = stringifyBboxCrs(options.crs);
  }

  if (options.bbox) {
    params.bbox = stringifyBbox(options.bbox);

    if (options.bboxCrs) {
      params['bbox-crs'] = stringifyBboxCrs(options.bboxCrs);
    }
  }

  if (options.datetime) {
    params.datetime = stringifyDatetime(options.datetime);
  }

  if (options.properties) {
    params.properties = stringifyProperties(options.properties);
  }

  if (options.sortby) {
    params.sortby = stringifySortBy(options.sortby);
  }

  if (options.filter) {
    const { filter, filterCrs, filterLang } = stringifyFilter({
      filter: options.filter,
      filterCrs: options.filterCrs,
      filterLang: options.filterLang,
    });

    params.filter = filter;

    if (filterLang) {
      params['filter-lang'] = filterLang;
    }

    if (filterCrs) {
      params['filter-crs'] = filterCrs;
    }
  }

  // should take care of 0
  if ('limit' in options) {
    params.limit = options.limit;
  }

  return params;
}
