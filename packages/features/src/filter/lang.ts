import { isObject } from "../util";

/**
 * filter lang enumeration
 */
export enum EFilterLang {
  TEXT = 'cql-text',
  JSON = 'cql-json',
}

export function isValidFilterLang(filterLang: EFilterLang) {
  if (filterLang !== EFilterLang.TEXT && filterLang !== EFilterLang.JSON) {
    return false;
  }

  return true;
}

export function guessFilterLang(filter: any): EFilterLang {
  if (typeof filter === 'string') {
    return EFilterLang.TEXT;
  }

  if (isObject(filter)) {
    return EFilterLang.JSON;
  }

  throw new Error('failed to guess filter lang from filter');
}