import { ICollection, ICollectionItems, ICollectionItem } from './types';

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
    const res: Response = await fetch(url);
    const result: IGetConformanceResponse = await res.json();
    return result.conformsTo;
  }

  /**
   *
   */
  async getCollections (): Promise<ICollection[]> {
    const url: string = `${this.baseUrl}/collections`;
    const res: Response = await fetch(url);
    const result: IGetCollectionsResponse = await res.json();
    return result.collections;
  }

  /**
   *
   * @param collectionId
   */
  async getCollection (collectionId: string): Promise<ICollection> {
    const url: string = `${this.baseUrl}/collections/${collectionId}`;
    const res: Response = await fetch(url);
    const result: ICollection = await res.json();
    return result;
  }

  /**
   *
   * @param collectionId
   */
  async getCollectionItems(collectionId: string): Promise<ICollectionItems> {
    const url: string = `${this.baseUrl}/collections/${collectionId}/items`;
    const res: Response = await fetch(url);
    const result: ICollectionItems = await res.json();
    return result;
  }

  /**
   *
   * @param collectionId
   * @param featureId
   */
  async getCollectionItem (collectionId: string, featureId: string): Promise<ICollectionItem> {
    const url: string = `${this.baseUrl}/collections/${collectionId}/items/${featureId}`;
    const res: Response = await fetch(url);
    const result: ICollectionItem = await res.json();
    return result;
  }
}

interface IGetConformanceResponse {
  conformsTo: string[];
}

interface IGetCollectionsResponse {
  collections: ICollection[];
}
