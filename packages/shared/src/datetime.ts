export type TDateLike = string | number | Date;
/**
 * datetime range
 */

export interface IDateRange {
  /**
   * start of range
   */
  start?: TDateLike;

  /**
   * end of range
   */
  end?: TDateLike;
}

function toDate(date: TDateLike) {
  return date instanceof Date ? date : new Date(date);
}

function isDateLike(value: any): value is TDateLike {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    value instanceof Date
  );
}

function isValidDate(date: TDateLike) {
  return !isNaN(toDate(date).getTime());
}

function stringifyDate(value: TDateLike) {
  return toDate(value).toISOString();
}

export function isValidDatetime(value: TDateLike | IDateRange): boolean {
  if (isDateLike(value)) {
    return isValidDate(value);
  }

  // the datetime range should have a start or an end
  if (value.start || value.end) {
    if (value.start && value.end) {
      return isValidDate(value.start) && isValidDate(value.end);
    } else if (value.start) {
      return isValidDate(value.start);
    } else if (value.end) {
      return isValidDate(value.end);
    }
  }

  return false;
}

export function stringifyDatetime(value: TDateLike | IDateRange): string {
  if (!isValidDatetime(value)) {
    throw new Error('invalid datetime');
  }

  if (isDateLike(value)) {
    return stringifyDate(value);
  } else {
    const { start, end } = value;
    const dates = [];

    if (start) {
      dates.push(stringifyDate(start));
    }

    dates.push('/');

    if (end) {
      dates.push(stringifyDate(end));
    }

    return dates.join('');
  }
}
