import React, { useEffect, useState } from "react";
import { Menu, Image } from "antd";
import "./index.scss";
import { fruits } from "../../../asserts/fruits";
import { useRecoilValue } from "recoil";
import { IntroContentDom, SelectedFruitFilter } from "../../../atom";
import { FruitsTypes } from "../../../types";
import NoImg from "../../../asserts/noimg.jpg";
import IntroBlock from "../IntroBlock";

interface IProps {}

const MyDivider: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="divider">
      <div className="start"></div>
      <div className="text">{title}</div>
      <div className="line"></div>
    </div>
  );
};

const index: React.FC<IProps> = (props) => {
  const selectedFruit = useRecoilValue(SelectedFruitFilter);
  const introContentDom = useRecoilValue(IntroContentDom);
  const { name, desp, disease, img, sicks } = selectedFruit;

  useEffect(() => {
    if (introContentDom) {
      introContentDom.scrollTo({
        top: 0,
      });
    }
  });

  return (
    <div className="fruit-intro">
      <div className="fruit-img">
        <Image src={img} />
      </div>
      <article className="fruit-article">
        <div className="fruit-name">{name}</div>
        <MyDivider title="简介" />
        <div className="fruit-desp">{desp}</div>
        <MyDivider title="常见疾病及防治" />
        <div className="fruit-disease">{disease}</div>
      </article>
      <footer className="fruit-sicks">
        {sicks?.map((sick, index) => {
          let newSick = {};
          if (sick.desp && sick.desp?.length > 20) {
            const tmp = sick.desp.split("").slice(0, 20);
            tmp.push("...");
            newSick = { ...sick, desp: tmp.join("") };
            return <IntroBlock key={index} {...newSick} />;
          }
          return <IntroBlock key={index} {...sick} />;
        })}
      </footer>
    </div>
  );
};
export default index;
