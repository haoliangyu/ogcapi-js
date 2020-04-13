import { FeatureCollection, Feature } from 'geojson';

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

export interface IFeatures extends FeatureCollection {

}

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
 *
 */
export interface ILink {
  /**
   *
   */
  href: string;

  /**
   *
   */
  rel: string;

  /**
   *
   */
  type: string;

  /**
   *
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
export interface IGetFeaturesParameters {
  /**
   * collection id
   */
  collectionId: string;

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

/**
 * request parameters to get a feature from a collection
 */
export interface IGetFeatureParameters {
  /**
   * collection id
   */
  collectionId: string;

  /**
   * feature id
   */
  featureId: string;
}

/**
 * datetime range
 */
export interface IDateRange {
  /**
   * start of range
   */
  start?: Date,

  /**
   * end of range
   */
  end?: Date
}
