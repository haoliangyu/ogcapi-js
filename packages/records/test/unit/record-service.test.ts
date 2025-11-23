import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('@ogcapi-js/shared', () => ({
  request: vi.fn(),
}));

import { request } from '@ogcapi-js/shared';
import { RecordsService } from '../../src/record-service';

describe('RecordsService (integration)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('collections() should call /collections', async () => {
    (request as any).mockResolvedValueOnce({ items: [{ id: 'c1' }] });
    const svc = new RecordsService({ baseUrl: 'https://api.example.com' });
    const res = await svc.collections();
    expect(res.items).toBeDefined();
    expect((request as any).mock.calls.length).toBe(1);
    expect((request as any).mock.calls[0][0].url).toBe(
      'https://api.example.com/collections'
    );
  });

  it('items() should pass params and strip trailing slash', async () => {
    (request as any).mockResolvedValueOnce({ items: [{ id: 'r1' }] });
    const svc = new RecordsService({ baseUrl: 'https://api.example.com/' });
    const res = await svc.items('my-collection', { limit: 10 });
    expect(res.items?.length).toBe(1);
    expect((request as any).mock.calls[0][0].url).toBe(
      'https://api.example.com/collections/my-collection/items'
    );
    expect((request as any).mock.calls[0][0].params).toEqual({ limit: 10 });
  });

  it('item() should call specific record', async () => {
    (request as any).mockResolvedValueOnce({ id: 'r1' });
    const svc = new RecordsService({ baseUrl: 'https://api.example.com' });
    const res = await svc.item('col', 'rec-1');
    expect((request as any).mock.calls[0][0].url).toBe(
      'https://api.example.com/collections/col/items/rec-1'
    );
    expect(res.id).toBe('r1');
  });

  it('facetDefinitions() should call /collections/{id}/facets', async () => {
    (request as any).mockResolvedValueOnce({
      facets: [{ name: 'f1', type: 'term', property: 'prop' }],
    });
    const svc = new RecordsService({ baseUrl: 'https://api.example.com' });
    const res = await svc.facetDefinitions('col');
    expect((request as any).mock.calls[0][0].url).toBe(
      'https://api.example.com/collections/col/facets'
    );
    expect(res.facets?.length).toBe(1);
  });

  it('items() should encode facets param when object provided', async () => {
    (request as any).mockResolvedValueOnce({ items: [] });
    const svc = new RecordsService({ baseUrl: 'https://api.example.com' });
    await svc.items('col', {
      facets: { myFacet: { type: 'term', property: 'prop' } },
      limit: 5,
    });
    const called = (request as any).mock.calls[0][0];
    expect(called.url).toBe('https://api.example.com/collections/col/items');
    expect(called.params.facets).toBe('myFacet:term(prop)');
    expect(called.params.limit).toBe(5);
  });
});
