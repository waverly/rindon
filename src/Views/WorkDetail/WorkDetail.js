import React, { Component, Fragment } from "react";
import Prismic from "prismic-javascript";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "Utils/prismic-configuration";
import { generateKey } from "Utils/helpers";
import {
  ImageBlock,
  Diptych,
  TextBlock,
  VideoBlock
} from "Components/DetailBody";
import { apiEndpoint } from "../../Utils/prismic-configuration";

const PageWrap = styled.div`
  text-align: left;
`;

const IntroText = styled.div`
  /* position: fixed; */
  top: 0;
  margin-left: 10vw;
  width: 80vw;
  /* height: 100vh;
  overflow: scroll; */
  z-index: 0;
  padding: 50px 0;

  p {
    margin: 2rem 0;
  }
`;

// const IntroTextInner = styled.div`
//   width: 100%;
//   height: 90%;
//   overflow-y: scroll;
//   padding-right: 17px; /* Increase/decrease this value for cross-browser compatibility */
//   box-sizing: content-box;
//   margin-top: 10%;
// `;

const BodyWrap = styled.div`
  /* z-index: 1; */
  position: relative;
  background: white;
  width: 100vw;
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
  padding: 10px;
  z-index: 5;

  font-size: 2rem;
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
          <Title>{title}</Title>
          <IntroText>
            {/* <IntroTextInner> */}
            {RichText.render(intro_text, linkResolver)}
            {/* </IntroTextInner> */}
          </IntroText>
          <BodyWrap>
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
                  return <FullHeight key={generateKey(index)} />;
              }
            })}
          </BodyWrap>
        </PageWrap>
      );
    } else return null;
  }
}

export default WorkDetail;
