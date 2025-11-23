import { request } from '@ogcapi-js/shared';
import {
  ICollection,
  IConformance,
  ILanding,
  IList,
  IRecord,
  IFacetDefinition,
  IFacetsResult,
  FacetType,
} from './models';

export interface IRecordsServiceConfig {
  baseUrl: string;
}

export class RecordsService {
  private baseUrl: string;

  constructor(config: IRecordsServiceConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
  }

  async landing(): Promise<ILanding> {
    return request({ url: `${this.baseUrl}/` });
  }

  async conformance(): Promise<IConformance> {
    return request({ url: `${this.baseUrl}/conformance` });
  }

  async collections(): Promise<IList<ICollection>> {
    return request({ url: `${this.baseUrl}/collections` });
  }

  async collection(id: string): Promise<ICollection> {
    return request({
      url: `${this.baseUrl}/collections/${encodeURIComponent(id)}`,
    });
  }

  private encodeFacetsParam(facets: Record<string, any> | string): string {
    // Minimal encoder: if string, return as-is. If object, serialize simple term/histogram entries.
    if (typeof facets === 'string') return facets;
    // Example object shape: { myFacet: { type: 'term', property: 'prop' } }
    const parts: string[] = [];
    for (const [name, def] of Object.entries(facets)) {
      if (typeof def === 'string') {
        parts.push(`${name}:${def}`);
        continue;
      }
      const t = (def.type || 'term') as FacetType;
      if (t === 'term') {
        parts.push(`${name}:term(${def.property})`);
      } else if (t === 'histogram') {
        parts.push(`${name}:histogram(${def.property})`);
      } else {
        parts.push(`${name}:${t}`);
      }
    }
    return parts.join(',');
  }

  async items(
    id: string,
    params?: Record<string, any> & { facets?: Record<string, any> | string }
  ): Promise<IList<IRecord> & IFacetsResult> {
    const localParams = { ...(params || {}) };
    if (localParams.facets) {
      localParams.facets = this.encodeFacetsParam(localParams.facets as any);
    }
    return request({
      url: `${this.baseUrl}/collections/${encodeURIComponent(id)}/items`,
      params: localParams,
    });
  }

  async item(id: string, recordId: string): Promise<IRecord> {
    return request({
      url: `${this.baseUrl}/collections/${encodeURIComponent(id)}/items/${encodeURIComponent(recordId)}`,
    });
  }

  async facetDefinitions(
    collectionId: string
  ): Promise<{ facets?: IFacetDefinition[] }> {
    return request({
      url: `${this.baseUrl}/collections/${encodeURIComponent(collectionId)}/facets`,
    });
  }
}
