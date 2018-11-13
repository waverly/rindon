import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { generateKey } from "Utils/helpers";

const ItemWrapper = styled.div`
  width: 100%;
  padding: 15px 10px;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 30%;
  text-align: right;

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
const Description = styled.h3``;

const PortfolioItem = props => {
  const { title, uid, tags, date } = props.data;

  return (
    <OuterWrap>
      <Link to={`/${uid}`}>
        <ItemWrapper>
          <Left>
            <Title>{title}</Title>
          </Left>
          <Right>hexagon</Right>
        </ItemWrapper>
      </Link>
    </OuterWrap>
  );
};

export default PortfolioItem;
