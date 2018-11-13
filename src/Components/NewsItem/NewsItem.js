import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { generateKey } from "Utils/helpers";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "Utils/prismic-configuration";

const ItemWrapper = styled.div`
  width: 100%;
  padding: 15px 10px;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  ${"" /* @media screen and (max-width: 1000px) {
    flex-direction: column;
  } */};
`;

const OuterWrap = styled.div`
  &:hover {
    background-color: ${props => props.theme.colors.yellow};
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
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100%;
  justify-content: space-between;
  align-items: flex-end;
  width: 30%;
  text-align: right;
  right: 0;
  top: 0;
  padding: 15px;

  span {
    margin-left: 10px;
    font-size: 12px;
    line-height: 18px;
    text-transform: uppercase;

    @media screen and (max-width: 1000px) {
      margin-left: 0;
      margin-right: 10px;
    }
  }
`;

const Title = styled.h1``;
const Blurb = styled.div``;
const Date = styled.p``;
const Location = styled.p``;
const MoreInfo = styled.a`
  font-size: 14px;
  margin-top: auto;
  text-decoration: underline;
`;

const Description = styled.h3``;

const NewsItem = props => {
  const { title, uid, time, location, link, blurb } = props.data;

  return (
    <OuterWrap>
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

          <MoreInfo target="_blank" href={link}>
            More Information
          </MoreInfo>
        </Right>
      </ItemWrapper>
    </OuterWrap>
  );
};

export default NewsItem;
