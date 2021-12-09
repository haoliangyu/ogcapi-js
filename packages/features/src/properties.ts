export function isValidProperties(properties: string[] | string): boolean {
  if (!Array.isArray(properties) && typeof properties !== 'string') {
    return false;
  }

  // at least one property should be defined
  if (properties.length === 0) {
    return false;
  }

  return true;
}

export function stringifyProperties(properties: string[] | string): string {
  if (!isValidProperties(properties)) {
    throw new Error('invalid properties');
  }

  return properties.toString();
}