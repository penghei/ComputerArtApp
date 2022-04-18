import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Menu, Image } from "antd";
import "./index.scss";
import { fruits } from "../../../asserts/fruits";
import { useSetRecoilState } from "recoil";
import { SelectedFruit } from "../../../atom";

interface IProps extends RouteComponentProps {}

const index: React.FC<IProps> = (props) => {
  const setFruit = useSetRecoilState(SelectedFruit);
  const handleMenu = (e: any) => {
    console.log(e.key);
    setFruit(e.key);
  };

  return (
    <>
      <Menu defaultSelectedKeys={["corn"]} mode="inline" onClick={handleMenu}>
        {fruits.map((item) => {
          const { name, engName, img } = item;
          return (
            <Menu.Item
              key={engName}
              icon={<img style={{ maxWidth: "40px" }} src={img} />}
              style={{ fontSize: "15px", marginBottom: "15px" }}
            >
              {name}
            </Menu.Item>
          );
        })}
      </Menu>
    </>
  );
};

export default withRouter(index);
