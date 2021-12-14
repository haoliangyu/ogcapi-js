import { isValidCrs } from './crs';

export function isValidBbox(bbox: number[]): boolean {
  if (!Array.isArray(bbox)) {
    return false;
  }

  // a bounding box should have 4 or 6 coordinates
  if (!(bbox.length === 4 || bbox.length === 6)) {
    return false;
  }

  return true;
}

export function stringifyBbox(bbox: number[]): string {
  if (!isValidBbox(bbox)) {
    throw new Error('invalid bbox');
  }

  return bbox.toString();
}

export function stringifyBboxCrs(bboxCrs: string): string {
  if (!isValidCrs(bboxCrs)) {
    throw new Error('invalid bbox crs');
  }

  return bboxCrs;
}
