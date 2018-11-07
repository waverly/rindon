import React, { Fragment } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavWrapper = styled.div`
  width: 100vw;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  @media screen and (max-width: 1000px) {
    background-color: white;
    border-bottom: 1px solid ${props => props.theme.colors.darkblue};
  }
`;

const Left = styled.div`
  width: 49%;
  h2 {
    font-size: 12px;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 49%;
  text-align: right;
`;

const NavItem = styled.h2`
  margin-left: 15px;
  font-size: 12px;
  line-height: 22px;
  text-transform: uppercase;
  position: relative;
  &:before {
    content: "";
    width: 100%;
    height: 40%;
    position: absolute;
    background-color: ${props => props.theme.colors.yellow};
    top: 30%;
    left: 0;
    z-index: -1;
    opacity: ${props => (props.active ? "1" : "0")};
    transition: 0.5s opacity;
  }
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;
const Description = styled.h3``;

const Nav = props => {
  return (
    <NavWrapper>
      <Left>
        <h2>Waverly Mandel</h2>
      </Left>
      <Right>
        <Link to="/">
          <NavItem active={props.location.pathname === "/"}>Info</NavItem>
        </Link>
        <Link to="/work">
          <NavItem active={props.location.pathname === "/work"}>
            Recent Work
          </NavItem>
        </Link>
      </Right>
    </NavWrapper>
  );
};

export default withRouter(Nav);
