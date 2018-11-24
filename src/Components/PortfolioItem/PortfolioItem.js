import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  transition: 0.1s all;
  &:hover {
    background-color: ${props => props.theme.keyColor};
    transition: 0.5s all;
  }

  svg {
    transition: 0.75s all;
    rect {
      fill: ${props => props.theme.keyColor};
      stroke-width: 0;
    }
  }

  &:hover {
    img {
      opacity: 1;
      transition: 0.2s opacity;
    }

    svg {
      transform: rotate(45deg) scale(0.5);
      transition: 0.5s all;
      border-radius: 50%;
      /* border-right: 2px solid black;
      border-top: 2px solid black; */
      rect {
        fill: black;
      }
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

const PortfolioItem = props => {
  const { title, uid, tags, date } = props.data;

  return (
    <OuterWrap>
      <Link to={`/work/${uid}`}>
        <ItemWrapper>
          <Left>
            <Title>{title}</Title>
          </Left>
          <Right>
            <svg width="20" height="20">
              <rect width="20" height="20" />
            </svg>
          </Right>
        </ItemWrapper>
      </Link>
    </OuterWrap>
  );
};

export default PortfolioItem;
