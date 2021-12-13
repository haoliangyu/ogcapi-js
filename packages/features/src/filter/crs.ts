import { isUrl } from "../util";

export function isValidFilterCrs(filterCrs: string): boolean {
  return isUrl(filterCrs);
}