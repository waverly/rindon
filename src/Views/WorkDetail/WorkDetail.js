import React, { Component, Fragment } from "react";
import Prismic from "prismic-javascript";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "Utils/prismic-configuration";
import { generateKey } from "Utils/helpers";
import { apiEndpoint } from "../../Utils/prismic-configuration";

const PageWrap = styled.div`
  text-align: left;
`;

const FilterItems = styled.div`
  width: 97vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  transform: rotate(-90deg);
  transform-origin: bottom right;
  margin-left: auto;
  position: fixed;
  top: -20px;
  right: 0;
  background: white;
  padding: 10px;
`;

const FilterItem = styled.h2`
  margin: 0 7px;
  font-size: 12px;
  line-height: 22px;
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
  &:before {
    content: "";
    width: 100%;
    height: 40%;
    position: absolute;
    background-color: ${props => props.theme.colors.yellow};
    top: 30%;
    left: 0;
    z-index: -1;
    opacity: ${props => (props.active ? "1" : "0")};
    transition: 0.5s opacity;
  }
`;

const PortfolioWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  max-width: 1000px;
  padding: 100px 0;
`;

const YearTitle = styled.h1`
  margin: 6rem 0px 20px 10px;
`;

const IntroText = styled.div`
  position: fixed;
  top: 0;
  left: 10vw;
  width: 80vw;
  height: 100vh;
  overflow: scroll;
  z-index: 0;
`;

const BodyWrap = styled.div`
  margin-top: 100vh;
  z-index: 5;
  position: relative;
`;

const FullHeight = styled.div`
  width: 100vw;
  height: 30vh;
  outline: 5px solid red;
  background-color: yellow;
`;

class WorkDetail extends Component {
  state = {};

  async componentDidMount() {
    const uid = this.props.match.params.uid;
    console.log(uid);
    const api = await Prismic.api(apiEndpoint);
    let data = await api.getByUID("work_item", uid);
    data = data.data;
    const { body, intro_text } = data;
    const title = data.project_title[0].text;

    data = { body, intro_text, title };

    this.setState({ data });
  }

  render() {
    if (this.state.data) {
      const { body, intro_text, title } = this.state.data;
      return (
        <PageWrap>
          <IntroText>{RichText.render(intro_text, linkResolver)}</IntroText>
          <BodyWrap>
            {body.map(module => {
              return <FullHeight />;
            })}
          </BodyWrap>
        </PageWrap>
      );
    } else return null;
  }
}

export default WorkDetail;
