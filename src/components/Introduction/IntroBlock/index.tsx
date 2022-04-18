import { Card } from "antd";
import React from "react";
import NoImg from "../../../asserts/noimg.jpg";
import "./index.scss";

interface IProps {
  img?: string;
  name?: string;
  desp?: string;
  url?: string;
}
const index: React.FC<IProps> = ({
  img = NoImg,
  name = "暂无数据",
  desp = "暂无解释",
}) => {
  const handleSearch = () => {
    if(name !== "暂无数据") window.open(`https://www.baidu.com/s?wd=${name}`)
  }
  return (
    <Card
      hoverable
      style={{ width: 200,minHeight:250,margin:15 }}
      cover={<img alt={name} src={img} />}
      className="intro-block"
      onClick={handleSearch}
    >
      <Card.Meta title={name} description={desp}></Card.Meta>
    </Card>
  );
};
export default index;
