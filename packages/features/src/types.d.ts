import { FeatureCollection, Feature } from 'geojson';

/**
 *
 */
export interface ICollection {
  /**
   *
   */
  id: string;

  /**
   *
   */
  title: string;

  /**
   *
   */
  description?: string;
}

/**
 *
 */
export interface ICollectionItems extends FeatureCollection {

}

/**
 *
 */
export interface ICollectionItem extends Feature {
  /**
   *
   */
  id?: string;
}
