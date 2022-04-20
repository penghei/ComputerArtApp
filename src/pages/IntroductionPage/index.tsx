import React, { useEffect, useRef } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import "./index.scss";
import IntroList from "../../components/Introduction/IntroList";
import IntroContent from "../../components/Introduction/IntroContent";
import { useSetRecoilState } from "recoil";
import { IntroContentDom } from "../../atom";

interface IProps extends RouteComponentProps {}

const index: React.FC<IProps> = (props) => {
  const introRef = useRef<HTMLDivElement>(null);
  const setIntroContent = useSetRecoilState(IntroContentDom)
  useEffect(()=>{
    setIntroContent(introRef.current)
  },[introRef])
  return (
    <div className="intro-main">
      <aside className="intro-list">
        <IntroList />
      </aside>
      <main className="intro-content" ref={introRef}>
        <IntroContent />
      </main>
    </div>
  );
};

export default withRouter(index);
