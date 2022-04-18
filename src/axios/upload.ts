import { request } from ".";
import { UploadRequestType } from "../types";

export const uploadImg = async (url: string, img: FormData) => {
  const res = await request<UploadRequestType>({
    url: url,
    methods: "POST",
    data: img,
  });
  return res;
};
