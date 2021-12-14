export function isObject(target: any): boolean {
  return !!target && target.constructor === Object;
}

export function isUrl(target: any): boolean {
  // use new URL() to test if target a valid URI reference
  try {
    new URL(target);
  } catch {
    return false;
  }

  return true;
}