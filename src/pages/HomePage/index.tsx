import { Steps } from "intro.js-react";
import React, { useEffect, useLayoutEffect, useState } from "react";
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
  const [stepEnabled, setStepEnabled] = useState(false);
  const steps = [
    {
      element: ".guide-home",
      intro: "点击这里可以回到主页",
    },
    {
      element: ".guide-intro",
      intro: "这里查看一些植物相关病害和防治策略",
    },
    {
      element: ".guide-setting",
      intro: "点击这里可以选择要识别的类型, 也可以选择要使用的模型",
    },
    {
      element: ".guide-upload",
      intro: "点击这里可以上传图片,或者将图片拖入这里",
    },
  ];
  const stepsOptions = {
    nextLabel: "下一个",
    prevLabel: "上一个",
    doneLabel: "结束",
    exitOnEsc: true,
  };
  useLayoutEffect(() => {
    const isFirst = localStorage.getItem("isFirst");
    if (isFirst && JSON.parse(isFirst)) setStepEnabled(false);
    else {
      localStorage.setItem("isFirst", JSON.stringify(true));
      setStepEnabled(true)
    }
  }, []);
  return (
    <>
      <Steps
        enabled={stepEnabled}
        steps={steps}
        initialStep={0}
        onExit={() => setStepEnabled(false)}
        options={stepsOptions}
      />
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
