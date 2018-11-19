import React, { Fragment, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { media } from "Styles/style-utils";

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

  ${media.handheld_landscape`
    height: 100vh;
    background-color: black;
    z-index: ${props => props.theme.z.nav};
    padding-top: 10rem;
    transition: .5s all;
    transform: ${props =>
      props.navDisplay ? "translateX(0)" : "translateX(120vw)"}
  `};
`;

const Left = styled.div`
  width: 90vh;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  transform: rotate(-90deg) translateX(-92vh);
  transform-origin: top left;

  ${media.handheld_landscape`
    width: auto;
    transform: unset;
    color: white;
    display: block;
    width: 100%;
    text-align: center;
  `};
`;

const NavItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 49%;
  text-align: right;

  ${media.handheld_landscape`
    flex-direction: column;
    width: 100%;
    text-align: center;
  `};
`;

const Icon = styled.button`
  width: 30px;
  height: 30px;
  border-radius: ${props => (props.navDisplay ? "0%" : "50%")};
  background-color: ${props => (props.navDisplay ? "yellow" : "black")};
  transition: 1s all;
  position: fixed;
  z-index: ${props => props.theme.z.alert};
  top: 20px;
  right: 20px;
  display: none;
  cursor: pointer;

  ${media.handheld_landscape`
    display: block;
  `};
`;

const NavItem = styled.h2`
  margin-left: 15px;
  ${props => props.theme.typeMixins.p};
  text-transform: uppercase;
  position: relative;

  &:before {
    content: "";
    width: ${props => (props.active ? "100%" : "0")};
    height: 40%;
    position: absolute;
    background-color: ${props => props.theme.colors.yellow};
    top: 30%;
    left: 0;
    z-index: -1;
    opacity: ${props => (props.active ? "1" : "0")};
    transition: 0.5s width;
  }

  &:hover {
    &:before {
      width: 100%;
      opacity: 1;
      transition: 0.5s width;
    }
  }

  ${media.handheld_landscape`
    color: white;
    font-size: ${props => props.theme.fontSize.mobileXl};
    line-height: ${props => props.theme.lineHeight.mobileXl};
    display: inline-block;
    margin-bottom: 1rem;
    margin-left: 0;

    &:hover{
      pointer-events: none;
    }

      &:before {
        content: "";
        height: 8px;
        top: 90%;
      }
  `};
`;

const TitleItem = styled(NavItem)`
  ${media.handheld_landscape`
    color: white; 
    font-size: ${props => props.theme.fontSize.mobileL};
    line-height: ${props => props.theme.lineHeight.mobileL};
    margin-bottom: 3rem;
   `};
`;

const Nav = props => {
  const [navDisplay, setNavDisplay] = useState(false);
  return (
    <Fragment>
      <Icon
        navDisplay={navDisplay}
        onClick={() => setNavDisplay(!navDisplay)}
      />
      <NavWrapper navDisplay={navDisplay}>
        <Left>
          <Link to="/" onClick={() => setNavDisplay(!navDisplay)}>
            <TitleItem>Rindon Johnson {navDisplay} </TitleItem>
          </Link>

          <NavItems>
            <Link to="/" onClick={() => setNavDisplay(!navDisplay)}>
              <NavItem active={props.location.pathname === "/"}>Work</NavItem>
            </Link>
            <Link to="/news" onClick={() => setNavDisplay(!navDisplay)}>
              <NavItem active={props.location.pathname === "/news"}>
                News
              </NavItem>
            </Link>
            <Link to="/about" onClick={() => setNavDisplay(!navDisplay)}>
              <NavItem active={props.location.pathname === "/about"}>
                About
              </NavItem>
            </Link>
          </NavItems>
        </Left>
      </NavWrapper>
    </Fragment>
  );
};

export default withRouter(Nav);
