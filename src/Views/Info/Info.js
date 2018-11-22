import React, { Component } from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "Utils/prismic-configuration";
import { fetchAbout } from "../../Utils/prismic-configuration";

const PageWrap = styled.div`
  text-align: left;
  padding: 150px 0px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${props => (props.loaded ? "1" : "0")};
  transition: 1s opacity;

  @media screen and (max-width: 1000px) {
    padding: 80px 0;
  }

  a {
    font-size: 14px;
  }
`;

const TextWrap = styled.div`
  width: 60%;
  margin: 0 auto;
  max-width: 600px;
  min-width: 500px;

  @media screen and (max-width: 1000px) {
    width: 90vw;
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
`;

const StyledLink = styled.h2`
  position: relative;
  display: inline-block;
  margin-right: 50px;
  &:before {
    ${props => props.theme.yellowBefore};
    width: 0;
    transition: 0.5s all;
  }
  &:hover {
    &:before {
      width: 100%;
      transition: 0.5s all;
    }
  }
`;

class Info extends Component {
  state = {
    loaded: false
  };
  async componentDidMount() {
    const data = await fetchAbout();
    this.setState({ data });
    setTimeout(() => {
      this.setState({ loaded: true });
    }, 1000);
  }

  render() {
    if (this.state.data) {
      const { text, contact, cv } = this.state.data;
      return (
        <PageWrap loaded={this.state.loaded}>
          <TextWrap>
            <Bio>{RichText.render(text, linkResolver)} </Bio>

            <FlexWrap>
              <a href={contact}>
                <StyledLink>Contact</StyledLink>
              </a>
              <a target="_blank" href={cv}>
                <StyledLink>Download CV</StyledLink>
              </a>
            </FlexWrap>
          </TextWrap>
        </PageWrap>
      );
    } else return null;
  }
}

export default Info;
