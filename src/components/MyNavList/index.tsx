import {
  Drawer,
  Menu,
  Space,
  Button,
  Radio,
  Form,
  Select,
  Divider,
  message,
} from "antd";
import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ModelTypes } from "../../atom";
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
  const setModelTypes = useSetRecoilState(ModelTypes);

  const onClose = () => setVisible(false);

  const handleClick = (e: any) => {
    console.log(e.key);
    if (e.key === "setting") {
      setVisible(true);
    } else {
      props.history.push({
        pathname: `/${e.key}`,
      });
    }
  };

  const handleFinishForm = (values: { modal: "A" | "B"; types: 'disease' | 'pest' }) => {
    console.log(values);
    if (values) message.success("修改成功!");

    setModelTypes(values.types);
  };

  return (
    <>
      <Menu onClick={handleClick} mode="horizontal" className="navlist">
        <Item key="home">
          <div className="guide-home">主页</div>
        </Item>
        <Item key="intro">
          <div className="guide-intro">常见病害知识</div>
        </Item>
        <Item key="setting" className="drawer">
          <div className="guide-setting">识别选项</div>
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
        initialValues={{ types: "disease", model: "A" }}
      >
        <Form.Item label="识别类型 : " name="types">
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="disease" defaultChecked>
              常规病害识别
            </Radio.Button>
            <Radio.Button value="pest">害虫识别</Radio.Button>
            <Radio.Button value="fruit" disabled>
              框框识别
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Divider />
        <Form.Item label="选择模型 : " name="model">
          <Select>
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
