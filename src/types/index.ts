export type DisplayValueType = {
  disease: string;
  solutions: string;
};

export type FruitsTypes = {
  name: string;
  desp: string;
  disease: string;
  img: string;
};

export type UploadResponseType = {
  result: string;
  msg?: string;
  solutions: string;
};
export type UploadRequestType = FormData


export interface RequestType<T> {
  url: string;
  methods: "POST" | "GET";
  data: T;
}
