import { isUrl } from "./util";

export function isValidCrs(crs: string): boolean {
  return isUrl(crs);
}

export function stringifyCrs(crs: string): string {
  if (!isUrl(crs)) {
    throw new Error('invalid crs');
  }

  return crs;
}