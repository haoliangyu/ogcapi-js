/**
 * sort item descriptor
 */
 export interface ISortByItem {
  /**
   * property to sort by
   */
  property: string;

  /**
   * sort order
   *
   * @default asc
   */
  order?: 'asc' | 'desc';
}

/**
 * sort type
 */
export type TSortBy = string | ISortByItem | (string | ISortByItem)[];

export function isValidSortBy(sortBy: TSortBy): boolean {
  if (Array.isArray(sortBy)) {
    if (sortBy.length === 0) {
      return false;
    }

    // validate each array item
    return sortBy.every((sortByItem) => isValidSortBy(sortByItem));
  }

  if (typeof sortBy !== 'string') {
    return isValidSortByItem(sortBy);
  }

  if (sortBy.length === 0) {
    return false;
  }

  return true;
}

/**
 * @internal
 */
function isValidSortByItem({ property, order }: ISortByItem): boolean {

  if (typeof property !== 'string') {
    return false;
  }

  if (property.length === 0) {
    return false;
  }

  // when present, verify that order is one of 'asc' or 'desc'
  if (order && order !== 'asc' && order !== 'desc') {
    return false;
  }

  return true;
}

export function stringifySortBy(sortBy: TSortBy): string {
  if (!isValidSortBy(sortBy)) {
    throw new Error('invalid sortby');
  }

  if (Array.isArray(sortBy)) {
    return sortBy
      .map((sortByItem) => {
        if (typeof sortByItem !== 'string') {
          return stringifySortByItem(sortByItem);
        }

        return sortByItem;
      }).toString();
  }

  if (typeof sortBy !== 'string') {
    return stringifySortByItem(sortBy);
  }

  return sortBy;
}

/**
 * @internal
 */
function stringifySortByItem({ property, order }: ISortByItem): string {
  return `${order === 'desc' ? '-' : ''}${property}`;
}