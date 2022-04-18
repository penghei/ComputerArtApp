import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import "./index.scss";
import IntroList from "../../components/Introduction/IntroList";
import IntroContent from "../../components/Introduction/IntroContent";


interface IProps extends RouteComponentProps {}

const index: React.FC<IProps> = (props) => {
  return (
    <div className="intro-main">
      <aside className="intro-list">
        <IntroList />
      </aside>
      <main className="intro-content">
          <IntroContent />
      </main>
    </div>
  );
};

export default withRouter(index);
