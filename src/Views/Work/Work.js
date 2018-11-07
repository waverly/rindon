import React, { Component, Fragment } from "react";
import styled from "styled-components";
import PortfolioItem from "Components/PortfolioItem";
import { generateKey } from "Utils/helpers";
import { fetchWorkPage } from "../../Utils/prismic-configuration";

const PageWrap = styled.div`
  text-align: left;
`;

const FilterItems = styled.div`
  width: 97vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  transform: rotate(-90deg);
  transform-origin: bottom right;
  margin-left: auto;
  position: fixed;
  top: -20px;
  right: 0;
  background: white;
  padding: 10px;
`;

const FilterItem = styled.h2`
  margin: 0 7px;
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

const PortfolioWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  max-width: 1000px;

  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

class Work extends Component {
  state = {};

  async componentDidMount() {
    const data = await fetchWorkPage();
    this.setState({ data });
  }

  render() {
    if (this.state.data) {
      return (
        <PageWrap>
          <FilterItems>
            <FilterItem>All</FilterItem>
            <FilterItem>Exhibition</FilterItem>
            <FilterItem>Sculpture</FilterItem>
            <FilterItem>Performance</FilterItem>
            <FilterItem>Published</FilterItem>
          </FilterItems>
          <PortfolioWrapper>
            {this.state.data.portfolioItems.map(item => (
              <PortfolioItem data={item} key={generateKey(item.uid)} />
            ))}
          </PortfolioWrapper>
        </PageWrap>
      );
    } else return null;
  }
}

export default Work;
