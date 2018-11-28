import React, { Fragment, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { media } from "Styles/style-utils";
import { generateKey } from "Utils/helpers";

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
  width: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  transform: rotate(-90deg) translateX(-99vh);
  transform-origin: top left;
  padding: 0 20px;

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
  background-color: ${props =>
    props.navDisplay ? props.theme.keyColor : "black"};
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
    background-color: ${props => props.theme.keyColor};
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
    margin: 1rem 0;
    margin-left: 0;
  

    &:hover{
      pointer-events: none;
      &:before{
        width: ${props => (props.active ? "100%" : "0")};
      }
    }

      &:before {
        content: "";
        height: 8px;
        top: 90%;
        width: ${props => (props.active ? "100%" : "0")};
      }
  `};
`;

const TitleItem = styled(NavItem)`
  margin-left: 15px;
  pointer-events: ${props => (props.workDetail ? "none" : "auto")};
  &:before {
    width: ${props => (props.workDetail ? "105%" : "0%")};
    opacity: ${props => (props.workDetail ? "1" : "0")};
    height: 100%;
    position: absolute;
    background-color: #e1b3ff;
    top: -3px;
    left: -5px;
    z-index: -1;
    padding: 2px;
    pointer-events: none;
  }

  &:hover {
    pointer-events: ${props => (props.workDetail ? "none" : "auto")};
    &:before {
      width: 100%;
      opacity: 1;
      transition: 0.5s width;
      height: 40%;
      position: absolute;
      background-color: ${props => props.theme.keyColor};
      top: 30%;
      left: 0;
      z-index: -1;
    }
  }

  ${media.handheld_landscape`
    color: white; 
    font-size: ${props => props.theme.fontSize.mobileL};
    line-height: ${props => props.theme.lineHeight.mobileL};
    margin-bottom: 3rem;

      &:before {
      width: auto;
      opacity: 1;
      height: 100%;
      position: absolute;
      background-color: #e1b3ff;
      top: -3px;
      left: -5px;
      z-index: -1;
      width: 105%;
      padding: 2px;
      pointer-events: none;
      }
    `};
`;

const FilterItems = styled.div`
  width: 100vh;
  display: ${props => (props.display ? "flex" : "none")};
  align-items: flex-end;
  justify-content: center;
  flex-wrap: wrap;
  transform: rotate(-90deg);
  transform-origin: bottom right;
  margin-left: auto;
  position: fixed;
  padding: 10px;
  right: 0;
  top: -60px;
  height: 60px;
  z-index: 1000;

  ${media.handheld_landscape`
    transform: unset;
    position: relative;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 0;
    top: 0;
    opacity: ${props => (props.display ? "1" : "0")};
    max-height: ${props => (props.display ? "600px" : "0")};
    transition: .5s max-height, .5s opacity;
    padding: 0;
    height: auto;
  `};
`;

const FilterItem = styled.h2`
  margin: 0 7px;
  ${props => props.theme.typeMixins.p};
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
  &:before {
    content: "";
    width: ${props => (props.active ? "100%" : "0")};
    height: 40%;
    position: absolute;
    background-color: ${props => props.theme.keyColor};
    top: 30%;
    left: 0;
    z-index: -1;
    transition: 0.5s all;
  }

  &:hover {
    &:before {
      width: 100%;
      transition: 1s all;
    }
  }
  ${media.handheld_landscape`
    color: white;
    margin-bottom: 1rem;
    &:before{
      height: 5px;
      top: 85%;
  `};
`;

const Nav = props => {
  const [navDisplay, setNavDisplay] = useState(false);

  const [workSubDisplay, setWorkSubDisplay] = useState(false);

  const displaySubNav = () => {
    alert("inside of displaySubnav");
    if (props.location.pathname === "/" && workSubDisplay) {
      return true;
    } else {
      return false;
    }
  };

  const handleWorkClick = e => {
    if (props.width < 769) {
      e.preventDefault();
      console.log(workSubDisplay);
      setWorkSubDisplay(!workSubDisplay);
      console.log(workSubDisplay);
    }
  };

  // e =>
  //   props.width > 768
  //     ? setNavDisplay(!navDisplay)
  //     : e => {
  //       e.preventDefault();
  //       setWorkSubDisplay(!workSubDisplay);
  //     }

  if (props.tags && props.width > 768) {
    return (
      <Fragment>
        <Icon
          navDisplay={navDisplay}
          onClick={() => setNavDisplay(!navDisplay)}
        />
        <FilterItems
          display={
            workSubDisplay ||
            (props.location.pathname === "/" && props.width > 768)
          }
        >
          <FilterItem
            active={props.currentFilterValue === "all"}
            onClick={() => {
              props.setFilterValue("all");
              setNavDisplay(false);
            }}
          >
            <Link to="/">All</Link>
          </FilterItem>
          {props.tags.map(tag => {
            return (
              <FilterItem
                key={generateKey(tag.title)}
                active={props.currentFilterValue === tag.title}
                onClick={() => {
                  props.setFilterValue(tag.title);
                  setNavDisplay(false);
                }}
              >
                <Link to="/">{tag.title}</Link>
              </FilterItem>
            );
          })}
        </FilterItems>
        <NavWrapper navDisplay={navDisplay}>
          <Left>
            <Link to="/" onClick={() => setNavDisplay(!navDisplay)}>
              <TitleItem
                workDetail={props.location.pathname.includes("/work/")}
              >
                Rindon Johnson {navDisplay}{" "}
              </TitleItem>
            </Link>
            <NavItems>
              <Link to="/" onClick={handleWorkClick}>
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
  } else if (props.width < 769 && props.tags) {
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
              <Link to="/" onClick={handleWorkClick}>
                <NavItem active={props.location.pathname === "/"}>Work</NavItem>
              </Link>
              <FilterItems
                display={
                  workSubDisplay ||
                  (props.location.pathname === "/" && props.width > 768)
                }
              >
                <FilterItem
                  active={props.currentFilterValue === "all"}
                  onClick={() => {
                    props.setFilterValue("all");
                    setNavDisplay(false);
                  }}
                >
                  <Link to="/">All</Link>
                </FilterItem>
                {props.tags.map(tag => {
                  return (
                    <FilterItem
                      key={generateKey(tag.title)}
                      active={props.currentFilterValue === tag.title}
                      onClick={() => {
                        props.setFilterValue(tag.title);
                        setNavDisplay(false);
                      }}
                    >
                      <Link to="/">{tag.title}</Link>
                    </FilterItem>
                  );
                })}
              </FilterItems>
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
  } else {
    return null;
  }
};

export default withRouter(Nav);
