import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import Prismic from "prismic-javascript";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "Utils/prismic-configuration";
import { generateKey } from "Utils/helpers";
import { media } from "Styles/style-utils";
import {
  ImageBlock,
  Diptych,
  TextBlock,
  VideoBlock
} from "Components/DetailBody";
import { apiEndpoint } from "../../Utils/prismic-configuration";

const PageWrap = styled.div`
  text-align: left;
  display: block;
  position: relative;
  min-height: 100vh;
  opacity: ${props => (props.loaded ? "1" : "0")};
  transition: 1s opacity;
  p {
    margin: 2rem 0;
  }
  a {
    position: relative;
    border-bottom: 2px solid black;
  }
`;

const IntroText = styled.div`
  position: relative;
  top: 0;
  width: 100vw;
  padding: 50px 10vw;
  display: ${props => (props.display ? "block" : "none")};
`;

const BodyWrap = styled.div`
  z-index: 1;
  position: relative;
  background: white;
  width: 100vw;
  opacity: 1;
  /* add the delay display: block so-as to not interrupt react transition group loading */
  display: ${props => (props.display ? "block" : "none")};
`;

const FullHeight = styled.div`
  width: 100vw;
  height: 30vh;
  outline: 5px solid red;
  background-color: yellow;
`;

const Title = styled.div`
  width: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  transform: rotate(-90deg);
  transform-origin: bottom right;
  margin-left: auto;
  position: fixed;
  top: -60px;
  right: 0;
  background: transparent;
  padding: 20px;
  z-index: 5;
  ${props => props.theme.typeMixins.p};
  text-transform: uppercase;

  ${media.handheld_landscape`
      font-size: 3rem;
      pointer-events: none;
      padding: 10px;
  `};

  span {
    position: relative;
    margin-left: 15px;
    padding: 0 5px 0 0;
    &:before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: ${props => props.theme.keyColor};
      top: -3px;
      left: -5px;
      z-index: -1;
      width: 105%;
      padding: 2px;
    }

    ${media.handheld_landscape`
      font-size: 3rem;
      pointer-events: none;
      padding: 5px;
      &:before{
        width: 100%;
      }
    `};
  }
`;

class WorkDetail extends Component {
  state = {
    loaded: false,
    bodyDisplay: false
  };

  async componentDidMount() {
    window.scrollTo(0, 0);
    const uid = this.props.match.params.uid;
    const api = await Prismic.api(apiEndpoint);
    let data = await api.getByUID("work_item", uid);
    if (data) {
      data = data.data;
      const { body, intro_text } = data;
      const title = data.project_title[0].text;
      data = { body, intro_text, title };
      this.setState({ data });
      setTimeout(() => {
        this.setState({ loaded: true });
      }, 1500);
      setTimeout(() => {
        if (body.length > 0) {
          this.setState({ bodyDisplay: true });
        }
      }, 2500);
    }
  }

  render() {
    if (this.state.data) {
      const { body, intro_text, title } = this.state.data;
      return (
        <PageWrap loaded={this.state.loaded}>
          <Title>
            <span>{title}</span>
          </Title>
          <IntroText
            display={intro_text.length > 0 && intro_text[0].text != ""}
          >
            {RichText.render(intro_text, linkResolver)}
          </IntroText>
          <BodyWrap display={this.state.bodyDisplay}>
            {body.map((module, index) => {
              switch (module.slice_type) {
                case "image":
                  return (
                    <ImageBlock
                      key={generateKey(index)}
                      data={module.primary}
                    />
                  );
                case "diptych":
                  return (
                    <Diptych key={generateKey(index)} data={module.primary} />
                  );
                case "video":
                  return (
                    <VideoBlock
                      key={generateKey(index)}
                      data={module.primary}
                    />
                  );
                case "text":
                  return (
                    <TextBlock key={generateKey(index)} data={module.primary} />
                  );
                default:
                  return null;
              }
            })}
          </BodyWrap>
        </PageWrap>
      );
    } else return null;
  }
}

export default withRouter(WorkDetail);
