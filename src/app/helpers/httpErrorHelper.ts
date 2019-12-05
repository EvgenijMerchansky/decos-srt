interface IHeaders {
  normalizedNames: any;
  lazyUpdate: any;
  lazyInit: () => void;
}

export interface IHttpError {
  error: any;
  headers: IHeaders;
  message: string;
  name: string;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
}

export interface IFakeError {
  printError(err: IHttpError): void;
}
