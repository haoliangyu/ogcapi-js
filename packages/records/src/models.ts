export interface ILink {
  href: string;
  rel?: string;
  type?: string;
  title?: string;
}

export interface ILanding {
  title?: string;
  links?: ILink[];
}

export interface IConformance {
  conformsTo?: string[];
  links?: ILink[];
}

export interface ICollection {
  id: string;
  title?: string;
  description?: string;
  links?: ILink[];
}

export interface IRecord {
  id: string;
  properties?: Record<string, any>;
  links?: ILink[];
}

export interface IList<T> {
  type?: string;
  items?: T[];
  links?: ILink[];
  meta?: {
    limit?: number;
    offset?: number;
    returned?: number;
    found?: number;
  };
}
