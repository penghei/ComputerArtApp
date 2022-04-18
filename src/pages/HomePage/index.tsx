import { Layout } from "antd";
import React from "react";
import {
  RouteComponentProps,
  withRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MyFooter from "../../components/MyFooter";
import MyNavList from "../../components/MyNavList";
import ResultDisplay from "../../components/ResultDisplay";
import UploadPic from "../../components/UploadPic";
import IntroductionPage from "../IntroductionPage";
import "./index.scss";

const { Header, Footer, Sider, Content } = Layout;

interface IProps extends RouteComponentProps {}

const HomeMainContainer = () => {
  return (
    <>
      <main className="container">
        <UploadPic />
        <ResultDisplay />
      </main>
      <MyFooter />
    </>
  );
};

const index: React.FC<IProps> = (props) => {
  return (
    <>
      <div className="home-page">
        <header className="header">
          <MyNavList />
        </header>
        <Switch>
          <Route path="/home" component={HomeMainContainer}></Route>
          <Route path="/intro" component={IntroductionPage}></Route>
          <Redirect to="/home" />
        </Switch>
      </div>
    </>
  );
};

export default withRouter(index);
