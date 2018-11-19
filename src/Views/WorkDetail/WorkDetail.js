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
`;

const IntroText = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  padding: 20vw;
  height: 100vh;
  z-index: 0;
  padding: 50px 10vw;
  overflow: scroll;
`;

const BodyWrap = styled.div`
  z-index: 1;
  position: relative;
  background: white;
  width: 100vw;
  margin-top: 100vh;
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
  background: transparent;
  padding: 20px;
  z-index: 5;
  ${props => props.theme.typeMixins.p};
  text-transform: uppercase;

  span {
    position: relative;
    &:before {
      ${props => props.theme.yellowBefore}
      width: 0;
    }

    ${media.handheld_landscape`
      font-size: 3rem;
      pointer-events: none;
      &:before{
        width: 100%;
      }
    `};
  }

  &:hover {
    span {
      &:before {
        opacity: 1;
        width: 100%;
        transition: all 0.5s;
      }
    }
  }
`;

const Test = styled.div`
  height: 100vh;
  width: 100vw;
`;

class WorkDetail extends Component {
  state = {
    loaded: false,
    bodyDisplay: false
  };

  async componentDidMount() {
    window.scrollTo(0, 0);
    const uid = this.props.match.params.uid;
    console.log(uid);
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
        this.setState({ bodyDisplay: true });
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
          <IntroText>{RichText.render(intro_text, linkResolver)}</IntroText>
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
    } else return <PageWrap />;
  }
}

export default withRouter(WorkDetail);
