import React, { Component, Fragment } from "react";
import styled from "styled-components";
import PortfolioItem from "Components/PortfolioItem";
import { generateKey } from "Utils/helpers";
import { fetchWorkPage } from "../../Utils/prismic-configuration";

const PageWrap = styled.div`
  text-align: left;
  padding: 150px 0px;

  @media screen and (max-width: 1000px) {
    padding: 50px 0;
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
