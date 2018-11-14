import React from "react";
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
  text-transform: uppercase;
  z-index: 5;
`;

const Left = styled.div`
  width: 97vh;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  transform: rotate(-90deg) translateX(-97vh);
  transform-origin: top left;
`;

const NavItems = styled.div`
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

const Nav = props => {
  return (
    <NavWrapper>
      <Left>
        <h2>Rindon Johnson</h2>

        <NavItems>
          <Link to="/">
            <NavItem active={props.location.pathname === "/"}>Work</NavItem>
          </Link>
          <Link to="/news">
            <NavItem active={props.location.pathname === "/news"}>News</NavItem>
          </Link>
          <Link to="/about">
            <NavItem active={props.location.pathname === "/about"}>
              About
            </NavItem>
          </Link>
        </NavItems>
      </Left>
    </NavWrapper>
  );
};

export default withRouter(Nav);
