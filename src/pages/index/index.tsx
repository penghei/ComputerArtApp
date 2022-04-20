import Taro from "@tarojs/taro";
import { Component, useEffect, useRef, useState } from "react";
import { View, Text, Button, Image, Camera } from "@tarojs/components";
import "./index.scss";

const sleep = async (delay: number) =>
  new Promise((r) => {
    setTimeout(r, delay);
  });

interface IProps {
  img: string;
  handleCancel: () => void;
  handleUpload: () => void;
}

const ImgDisplay: React.FC<IProps> = ({ img, handleCancel, handleUpload }) => {
  return (
    <View className="img-display">
      <Text>图片预览</Text>
      <Image src={img} mode="aspectFit" />
      <View className="control">
        <Button onClick={handleUpload}>确定上传</Button>
        <Button onClick={handleCancel}>重新选择</Button>
      </View>
    </View>
  );
};

export default function Index() {
  const [displayImg, setDisplayImg] = useState("");
  const imgBase64 = useRef<string | ArrayBuffer>("");
  const imgFilePath = useRef("");

  const handlePickImg = () => {
    console.log("upload");
    Taro.chooseImage({
      count: 1,
      sizeType: ["original"],
      success(res) {
        const tempFilePaths = res.tempFilePaths[0];
        imgFilePath.current = tempFilePaths;
        Taro.getImageInfo({
          src: tempFilePaths,
          success(img) {
            setDisplayImg(img.path);
            const base64 = Taro.getFileSystemManager().readFileSync(
              img.path,
              "base64"
            );
            imgBase64.current = base64;
          },
        });
      },
    });
  };

  const handleCancel = () => {
    console.log("cancel");
    setDisplayImg("");
    handlePickImg();
  };

  const handleUpload = async () => {
    Taro.showLoading({
      title: "上传中......",
    });
    await sleep(2000);
    Taro.hideLoading();
    Taro.showLoading({
      title: "生成结果中......",
    });
    await sleep(2300);
    Taro.hideLoading();
    Taro.showModal({
      title: "识别结果",
      content: `识别结果为: 苹果疫腐病`,
      confirmText: "确定",
      cancelText: "重新选择",
      success(modalRes) {
        if (modalRes.cancel) {
          console.log("cancel");
          setDisplayImg("");
        }
      },
    });
  };

  return (
    <View className="index-page">
      <View className="index-block">
        {!displayImg && (
          <>
            <View className="welcome">
              <Text>欢迎来到智能识别系统!</Text>
              <Button onClick={handlePickImg}>
                <Image
                  style="width: 30px;height: 30px"
                  src="https://pic.imgdb.cn/item/625ff5ab239250f7c532de4e.png"
                />
                点击上传图片或拍照
              </Button>
            </View>
          </>
        )}
        {displayImg && (
          <View className="display">
            <ImgDisplay
              img={displayImg}
              handleCancel={handleCancel}
              handleUpload={handleUpload}
            />
          </View>
        )}
      </View>
      <View className="index-footer">
        <View className="home block">
          <View className="icon">
            <Image
              style="width: 20px;height: 20px"
              src="https://pic.imgdb.cn/item/625feb2d239250f7c51d9baa.png"
            />
          </View>
          <Text className="font">首页</Text>
        </View>
        <View className="intro block">
          <View className="icon">
            <Image
              style="width: 20px;height: 20px"
              src="https://pic.imgdb.cn/item/625feb2d239250f7c51d9ba3.png"
            />
          </View>
          <Text className="font">知识介绍</Text>
        </View>
        <View className="user block">
          <View className="icon">
            <Image
              style="width: 20px;height: 20px"
              src="https://pic.imgdb.cn/item/625feb2d239250f7c51d9b9a.png"
            />
          </View>
          <Text className="font">用户中心</Text>
        </View>
      </View>
    </View>
  );
}
