/**
 * datetime range
 */
export interface IDateRange {
  /**
   * start of range
   */
  start?: Date;

  /**
   * end of range
   */
  end?: Date;
}

export function isValidDatetime(value: Date | IDateRange): boolean {
  if (value instanceof Date) {
    return true;
  }

  // the datetime range should have a start or an end
  if (value.start || value.end) {
    return true;
  }

  return false;
}

export function stringifyDatetime(value: Date | IDateRange): string {
  if (!isValidDatetime(value)) {
    throw new Error('invalid datetime');
  }

  if (value instanceof Date) {
    return value.toISOString();
  } else {
    const { start, end } = value;
    const dates = [];

    if (start) {
      dates.push(start.toISOString());
    }

    dates.push('/');

    if (end) {
      dates.push(end.toISOString());
    }

    return dates.join('');
  }
}
