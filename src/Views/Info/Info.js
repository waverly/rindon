import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PortfolioItem from "Components/PortfolioItem";
import { generateKey } from "Utils/helpers";
import { fetchWorkPage } from "../../Utils/prismic-configuration";

const PageWrap = styled.div`
  text-align: left;
  padding: 150px 0px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1000px) {
    padding: 80px 0;
  }

  a {
    font-size: 14px;

    @media screen and (max-width: 1000px) {
      font-size: 16px;
    }
  }
`;

const TextWrap = styled.div`
  width: 60%;
  margin: 0 auto;
  max-width: 600px;
  min-width: 500px;

  @media screen and (max-width: 1000px) {
    width: 95%;
    min-width: auto;
  }
`;
const Bio = styled.h2`
  margin-bottom: 40px;
`;

const FlexWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 40px;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }

  div {
    margin-right: 80px;
    @media screen and (max-width: 1000px) {
      margin-right: 0;
      width: 100%;
    }
  }
  a {
    margin-right: 20px;
  }
`;

const Github = styled.h2`
  position: relative;
  display: inline-block;
  &:before {
    ${props => props.theme.yellowBefore};
  }
`;

const Info = props => {
  return (
    <PageWrap>
      <TextWrap>
        <Bio>
          WAVERLY MANDEL IS A creative full-stack web developer with strong
          design sensibility and attention to detail. After studying web
          programming and VISUAL art at New York University, SHE went on to
          split her time between building websites and applications, teaching
          Front-End Web Development for General Assembly, and doing occasional
          boutique design work. Please reach out with any inquiries.
        </Bio>

        <h2>Technologies</h2>
        <br />
        <FlexWrap>
          <div>
            <h3>*React.JS</h3>
            <h3>*Angular 2+</h3>
            <h3>*Shopify / Liquid</h3>
            <h3>*GraphQL</h3>
          </div>
          <div>
            <h3>*Javascript / JQuery</h3>
            <h3>*HTML5</h3>
            <h3>*css /scss / jss</h3>
            <h3>*Basic ThreeJS / WebGL</h3>
          </div>
        </FlexWrap>
        <FlexWrap>
          <a href="mailto:waverly.rose.mandel@gmail.com">
            <Github>Contact</Github>
          </a>
          <a href="https://github.com/waverly">
            <Github>View Github</Github>
          </a>
        </FlexWrap>
      </TextWrap>
    </PageWrap>
  );
};

export default Info;
