import { Layout } from "antd";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import MyFooter from "../../components/MyFooter";
import MyNavList from "../../components/MyNavList";
import ResultDisplay from "../../components/ResultDisplay";
import UploadPic from "../../components/UploadPic";
import "./index.scss";

const { Header, Footer, Sider, Content } = Layout;

interface IProps extends RouteComponentProps {}

const index: React.FC<IProps> = (props) => {
  return (
    <>
      <div className="home-page">
        <header className="header">
          <MyNavList />
        </header>
        <main className="container">
          <UploadPic />
          <ResultDisplay/>
        </main>
        <MyFooter />
      </div>
    </>
  );
};

export default withRouter(index);
