import {
  Drawer,
  Menu,
  Space,
  Button,
  Radio,
  Form,
  Select,
  Divider,
} from "antd";
import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import "./index.scss";

const { Item } = Menu;
const { Option } = Select;
interface IProps extends RouteComponentProps {}
interface IChildProps {
  handleFinishForm: (values: any) => void;
  onClose: () => void;
}

const index: React.FC<IProps> = (props) => {
  const [drawerVisible, setVisible] = useState(false);

  const onClose = () => setVisible(false);

  const handleClick = (e: any) => {
    console.log(e.key);
    if (e.key === "setting") {
      setVisible(true);
    }
  };

  const handleFinishForm = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <Menu onClick={handleClick} mode="horizontal" className="navlist">
        <Item key="home">主页</Item>
        <Item key="else">关于我们</Item>
        <Item key="setting" className="drawer">
          识别选项
        </Item>
      </Menu>
      <Drawer
        title="识别选项"
        placement="right"
        onClose={onClose}
        visible={drawerVisible}
      >
        <SettingForm handleFinishForm={handleFinishForm} onClose={onClose} />
      </Drawer>
    </>
  );
};

export default withRouter(index);

const SettingForm: React.FC<IChildProps> = ({ handleFinishForm, onClose }) => {
  return (
    <>
      <Form
        layout="vertical"
        hideRequiredMark
        onFinish={handleFinishForm}
        initialValues={{ types: "leaf", model: "A" }}
      >
        <Form.Item label="识别类型 : " name="types">
          <Radio.Group buttonStyle="solid" size="large">
            <Radio.Button value="leaf" defaultChecked>
              叶子识别
            </Radio.Button>
            <Radio.Button value="fruit">果实识别</Radio.Button>
            <Radio.Button value="bugs">害虫识别</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Divider />
        <Form.Item label="选择模型 : " name="model">
          <Select size="large">
            <Option value="A">模型A</Option>
            <Option value="B">模型B</Option>
            <Option value="C" disabled>
              待测试模型C
            </Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={() => onClose()}>
            确定更改
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
