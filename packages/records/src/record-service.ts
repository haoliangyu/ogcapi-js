import { request } from '@ogcapi-js/shared';
import { ICollection, IConformance, ILanding, IList, IRecord } from './models';

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
    return request({ url: `${this.baseUrl}/collections/${encodeURIComponent(id)}` });
  }

  async items(id: string, params?: Record<string, any>): Promise<IList<IRecord>> {
    return request({ url: `${this.baseUrl}/collections/${encodeURIComponent(id)}/items`, params });
  }

  async item(id: string, recordId: string): Promise<IRecord> {
    return request({ url: `${this.baseUrl}/collections/${encodeURIComponent(id)}/items/${encodeURIComponent(recordId)}` });
  }
}
