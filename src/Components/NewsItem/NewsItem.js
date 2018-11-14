import React from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { linkResolver } from "Utils/prismic-configuration";

const ItemWrapper = styled.div`
  width: 100%;
  padding: 15px 10px;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const OuterWrap = styled.div`
  transition: 0.25s all;
  &:hover {
    background-color: ${props => props.theme.colors.yellow};
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

  span {
    margin-left: 10px;
    ${props => props.theme.typeMixins.p};
    text-transform: uppercase;

    @media screen and (max-width: 1000px) {
      margin-left: 0;
      margin-right: 10px;
    }
  }
`;

const Title = styled.h3`
  ${props => props.theme.typeMixins.h3};
  margin-bottom: 1rem;
`;
const Blurb = styled.div`
  ${props => props.theme.typeMixins.p};
`;
const Date = styled.p`
  ${props => props.theme.typeMixins.p};
`;
const Location = styled.p`
  ${props => props.theme.typeMixins.p};
`;
const MoreInfo = styled.a`
  ${props => props.theme.typeMixins.p};
  margin-top: auto;
  text-decoration: underline;
`;

const NewsItem = props => {
  const { title, time, location, link, blurb } = props.data;

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
