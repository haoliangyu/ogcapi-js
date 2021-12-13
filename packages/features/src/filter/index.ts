import { isObject } from '../util';
import { isValidFilterCrs } from './crs';
import { EFilterLang, guessFilterLang, isValidFilterLang } from './lang';

// re-export types and constants
export { EFilterLang } from './lang';

/**
 * @internal
 */
interface IStringifyFilterOptions {
  filter: TFilter;
  filterLang?: EFilterLang;
  filterCrs?: string;
}

/**
 * @internal
 */
interface IStringifyFilterResult {
  filter: string;
  filterLang: string;
  filterCrs?: string;
}

/**
 * cql text filter
 */
export type TTextFilter = string;

/**
 * cql json filter
 */
export interface IJSONFilter {
  [record: string]: any;
}

/**
 * filter type
 */
export type TFilter = TTextFilter | IJSONFilter;

/**
 * @internal
 */
function isValidTextFilter(filter: TFilter): boolean {
  if (typeof filter !== 'string') {
    return false;
  }

  if (filter.length === 0) {
    return false;
  }

  return true;
}

/**
 * @internal
 */
function isValidJSONFilter(filter: TFilter): boolean {
  if (!isObject(filter)) {
    return false;
  }

  if (Object.keys(filter).length === 0) {
    return false;
  }

  return true;
}

export function isValidFilter(filter: TFilter): boolean {
  if (!isValidTextFilter(filter) && !isValidJSONFilter(filter)) {
    return false;
  }

  return true;
}

export function stringifyFilter({
  filter,
  filterCrs,
  filterLang,
}: IStringifyFilterOptions): IStringifyFilterResult {
  if (!isValidFilter(filter)) {
    throw new Error('invalid filter');
  }

  if (filterCrs && !isValidFilterCrs(filterCrs)) {
    throw new Error('invalid filter crs');
  }

  if (filterLang && !isValidFilterLang(filterLang)) {
    throw new Error('invalid filter lang');
  }

  // try to guess filter lang when not available
  if (!filterLang) {
    filterLang = guessFilterLang(filter);
  }

  // strinigfy when filter is an object
  if (typeof filter !== 'string') {
    filter = JSON.stringify(filter);
  }

  return {
    filter,
    filterCrs,
    filterLang,
  };
}