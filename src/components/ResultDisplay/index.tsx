import { Button, Card } from "antd";
import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ResultInfo } from "../../atom";
import "./index.scss";

interface IProps extends RouteComponentProps {}

const index: React.FC<IProps> = (props) => {
  const { value, canSee } = useRecoilValue(ResultInfo);
  const { disease, solutions } = value;

  const searchBaidu = () => {
    window.open(`https://www.baidu.com/s?wd=${disease}`);
  };

  return (
    <div className="result-block">
      {canSee && (
        <main className="result-inner">
          <p className="result-title">当前识别结果为：{disease}</p>
          {solutions && (
            <p className="result-text">建议解决方案: {solutions}</p>
          )}
          <Button onClick={searchBaidu} type="primary">
            跳转搜索解决方案
          </Button>
        </main>
      )}
    </div>
  );
};

export default withRouter(index);
