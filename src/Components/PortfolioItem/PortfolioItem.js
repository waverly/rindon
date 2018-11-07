import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { generateKey } from "Utils/helpers";

const ItemWrapper = styled.div`
  width: 100%;
  padding: 30px 10px;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const OuterWrap = styled.div`
  &:hover {
    background-color: ${props => props.theme.colors.yellow};
  }

  img {
    opacity: 0;
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 350px;
    border: 2px solid ${props => props.theme.colors.darkblue};
    transition: 0.2s opacity;
    @media screen and (max-width: 1000px) {
      display: none;
      pointer-events: none;
    }
  }

  &:hover {
    img {
      opacity: 1;
      transition: 0.2s opacity;
    }
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;

  @media screen and (max-width: 1000px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  width: 30%;
  text-align: right;
  @media screen and (max-width: 1000px) {
    width: 100%;
    text-align: left;
    justify-content: flex-start;
  }
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

const Title = styled.h1`
  margin-bottom: 10px;
`;
const Description = styled.h3``;

const PortfolioItem = props => {
  const { title, description, hyperlink, thumbnail, technologies } = props.data;

  return (
    <OuterWrap>
      <a href={hyperlink} target="_blank">
        <ItemWrapper>
          <Left>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </Left>
          <Right>
            {technologies.map(tech => (
              <span key={generateKey(tech)}>{tech}</span>
            ))}
          </Right>
        </ItemWrapper>
      </a>
      <img src={thumbnail} alt="" />
    </OuterWrap>
  );
};

export default PortfolioItem;
