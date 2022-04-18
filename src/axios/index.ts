import axios, { AxiosResponse } from "axios";
import { RequestType, UploadResponseType } from "../types";

const statusDic: {
  [key: number | string]: string;
} = {
  400: "客户端错误，服务器不能处理该请求",
  403: "请求没有权限",
  404: "请求未找到",
  405: "请求方法不正确",
  408: "请求超时",
  500: "出现服务器错误",
  502: "网关服务器请求无效",
};

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export async function request<T = any>(config: RequestType<T>) {

  try {
    const { data } = await instance.request<UploadResponseType>(config);
    return data;
  } catch (err) {
    console.warn(err);
  }
}
