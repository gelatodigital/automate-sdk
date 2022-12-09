export interface Secrets {
  [key: string]: string;
}

export interface Storage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface JsResolverArgs {
  [key: string]: string | number | boolean | string[] | number[] | boolean[];
}
