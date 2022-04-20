import React, { DragEventHandler, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Upload, message, Button, Progress, Spin, Divider } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import "./index.scss";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { ModelTypes, ResultInfo } from "../../atom";
import axios from "axios";
import { uploadImg } from "../../axios/upload";
const { Dragger } = Upload;

type Base64Type = string | ArrayBuffer | null;
type getBaseCBType = (result: Base64Type) => void;
type getBaseType = (file: File, callback: getBaseCBType) => void;

interface IProps extends RouteComponentProps {}

const UploadPic: React.FC<IProps> = (props) => {
  const [picFile, setPicFile] = useState<File>(); //图片文件
  const [imgBase64, setImgBase] = useState<Base64Type>(""); //图片Base64
  const [controlCanSee, setControl] = useState(true); //确定按钮是否可视,上传成功后就消失
  const [spinning, setSpinning] = useState(false);
  const setResult = useSetRecoilState(ResultInfo); //结果显示框,在atom中
  const setDefault = useResetRecoilState(ResultInfo); // 把展示对象恢复为默认值

  const modelTypes = useRecoilValue(ModelTypes); // 选择的模型类型

  /**获取图片base64格式,用于预览 */
  const getBase64: getBaseType = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const formatBase64 = (value: Base64Type) => {
    if (typeof value !== "string") {
      console.warn("图片解析错误");
      return "";
    }
    return value.slice(value.indexOf(",") + 1);
  };

  /**确认上传回调,会启动进度条、让确认上传按钮消失，并设置结果 */
  const confirmUpload = async () => {
    setSpinning(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    const imgFormData = new FormData();
    imgFormData.append("myImage", picFile as Blob);

    // const data = await uploadImg(`/${modelTypes}/`, imgFormData);
    try {
      const { data } = await axios.post(
        `http://127.0.0.1:8000/${modelTypes}/`,
        imgFormData,
        {
          timeout: 20000,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("UPLOAD_DATA:", data);

      const { result: disease, solutions, msg } = data;
      message.success("上传成功,正在生成结果……");

      setResult({ canSee: true, value: { disease, solutions } });
      setControl(false);
      setSpinning(false);
    } catch (err) {
      message.error("上传失败");
      console.error('ERROR',err)
      setSpinning(false);
      return;
    }
  };

  /**重新选择回调，会清除文件、详情和当前展示 */
  const giveupUpload = () => {
    setImgBase("");
    setPicFile(undefined);
    setDefault();
    setControl(true);
  };

  /**上传组件配置 */
  const settings = {
    name: "picFile",
    multiple: false,
    onChange(info: any) {},
    onDrop(e: React.DragEvent) {
      const file = e.dataTransfer.files[0];
    },
    /**上传之前回调，会设置图片、转base64并预览，让控制按钮可见 */
    beforeUpload(file: File) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        message.error("只能上传 JPG/PNG 格式的图片!");
        return false;
      }
      setPicFile(file);
      setControl(true);
      setDefault();
      getBase64(file, (res) => {
        res && setImgBase(res);
      });
      return false;
    },
  };

  return (
    <Spin spinning={spinning}>
      <div
        className="upload-block "
        //
      >
        <Dragger
          {...settings}
          className="upload-drag guide-upload"
          style={{ display: controlCanSee ? "block" : "none" }}
        >
          <p className="ant-upload-drag-icon ">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽文件到此处</p>
        </Dragger>
        <Divider />
        {imgBase64 && (
          <div className="display">
            <header className="display-title">图片预览</header>
            <img
              src={typeof imgBase64 === "string" ? imgBase64 : ""}
              className="img"
              alt={picFile?.name}
            />
            <footer className="btns">
              <Button
                onClick={confirmUpload}
                style={{ display: controlCanSee ? "block" : "none" }}
                type="primary"
              >
                确定上传
              </Button>
              <Button onClick={giveupUpload} type="primary">
                重新选择
              </Button>
            </footer>
          </div>
        )}
      </div>
    </Spin>
  );
};

export default withRouter(UploadPic);
