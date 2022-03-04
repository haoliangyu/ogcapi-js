import { isObject } from '../util';

/**
 * filter lang enumeration
 */
export enum EFilterLang {
  CQL2_TEXT = 'cql2-text',
  CQL2_JSON = 'cql2-json',

  // keep for backwards compability
  CQL_TEXT = 'cql-text',
  CQL_JSON = 'cql-json',
}

export function isValidFilterLang(filterLang: EFilterLang) {
  if (
    filterLang !== EFilterLang.CQL_TEXT &&
    filterLang !== EFilterLang.CQL_JSON &&
    filterLang !== EFilterLang.CQL2_TEXT &&
    filterLang !== EFilterLang.CQL2_JSON
  ) {
    return false;
  }

  return true;
}

export function guessFilterLang(filter: any): EFilterLang {
  if (typeof filter === 'string') {
    return EFilterLang.CQL2_TEXT;
  }

  if (isObject(filter)) {
    return EFilterLang.CQL2_JSON;
  }

  throw new Error('failed to guess filter lang from filter');
}
