import React from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "Utils/prismic-configuration";
import { media } from "Styles/style-utils";

const ItemWrapper = styled.div`
  width: 100%;
  padding: 15px 10px;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: space-between;
  position: relative;
  ${media.handheld_landscape`
    flex-direction: column;
  `};
`;

const OuterWrap = styled.div`
  transition: 0.25s all;
  &:hover {
    background-color: ${props => props.theme.keyColor};
    transition: 0.5s background-color;
  }

  &:hover {
    img {
      opacity: 1;
      transition: 0.2s opacity;
    }
  }
`;

const Left = styled.div`
  width: 60%;
  ${media.handheld_landscape`
    width: 100%;
    margin-bottom: 1.5rem;
  `};
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 30%;
  text-align: right;
  right: 0;
  top: 0;
  ${media.handheld_landscape`
    width: 100%;
    text-align: left;
    align-items: flex-start;
  `};

  span {
    margin-left: 10px;
    text-transform: uppercase;
  }
`;

const Title = styled.h3`
  margin-bottom: 1rem;
`;
const Blurb = styled.div``;
const Date = styled.p``;
const Location = styled.p``;
const MoreInfo = styled.p`
  margin-top: auto;
  text-decoration: underline;
`;

const NewsItem = props => {
  const { title, time, location, link, blurb } = props.data;

  return (
    <OuterWrap>
      <a target="_blank" href={link}>
        <ItemWrapper>
          <Left>
            <Title>{title}</Title>
            <Blurb>{RichText.render(blurb, linkResolver)}</Blurb>
          </Left>
          <Right>
            <div>
              <Date>{time}</Date>
              <Location>{location}</Location>
            </div>

            <MoreInfo>More Information</MoreInfo>
          </Right>
        </ItemWrapper>
      </a>
    </OuterWrap>
  );
};

export default NewsItem;
