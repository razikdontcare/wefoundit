export interface UploadParams {
  key: string;
  body: Buffer | Uint8Array | Blob | string;
  contentType?: string;
  prefix?: string;
}

export interface DeleteParams {
  key: string;
}

export interface GetParams {
  key: string;
}

export interface ListParams {
  prefix?: string;
}

export interface IStorageService {
  upload(params: UploadParams): Promise<string>;
  delete(params: DeleteParams): Promise<boolean>;
  get(params: GetParams): Promise<Buffer>;
  list(params?: ListParams): Promise<string[]>; // return list of keys
}
