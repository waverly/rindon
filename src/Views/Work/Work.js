import React, { Component, Fragment } from "react";
import styled from "styled-components";
import Filter from "Components/Filter";
import PortfolioItem from "Components/PortfolioItem";
import { generateKey } from "Utils/helpers";
import { fetchWorkPage, fetchTags } from "../../Utils/prismic-configuration";
import { media } from "Styles/style-utils";

const PageWrap = styled.div`
  text-align: left;
  display: block;
  position: relative;
  opacity: ${props => (props.loaded ? "1" : "0")};
  transition: 1s opacity;
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
  padding: 10px;
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
    opacity: ${props => (props.active ? "1" : "0")};
    transition: 0.5s opacity;
  }
`;

const PortfolioWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  max-width: 1000px;
  padding: 100px 0;
  min-height: 100vh;

  ${media.handheld_landscape`
    width: 90vw;
    margin-right: auto;
  `};
`;

const YearTitle = styled.h1`
  margin: 6rem 0px 20px 10px;
`;

class Work extends Component {
  state = {
    loaded: false
  };

  compare = (a, b) => {
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
  };

  async componentDidMount() {
    window.scrollTo(0, 0);
    const data = await fetchWorkPage();
    const dataSet = data.workPageData;
    const allYears = dataSet.map(r => r.year);
    let uniqueYears = allYears.filter(function(item, pos) {
      return allYears.indexOf(item) == pos;
    });
    uniqueYears.sort(this.compare);

    this.setState({ workPageData: dataSet, years: uniqueYears });

    setTimeout(() => {
      this.setState({ loaded: true });
    }, 1000);
  }

  render() {
    if (this.state.workPageData) {
      return (
        <PageWrap loaded={this.state.loaded}>
          <PortfolioWrapper>
            {this.state.years.map(year => {
              if (
                this.state.workPageData
                  .filter(i => i.year === year)
                  .filter(i => {
                    return (
                      this.props.currentFilterValue === "all" ||
                      i.tags.some(tag => {
                        if (tag) {
                          return tag.title === this.props.currentFilterValue;
                        } else return null;
                      })
                    );
                  }).length > 0
              ) {
                return (
                  <Fragment key={year}>
                    <YearTitle>{year}</YearTitle>
                    {this.state.workPageData
                      .filter(i => i.year === year)
                      .filter(i => {
                        return (
                          this.props.currentFilterValue === "all" ||
                          i.tags.some(tag => {
                            if (tag) {
                              return (
                                tag.title === this.props.currentFilterValue
                              );
                            } else return null;
                          })
                        );
                      })
                      .map(item => (
                        <PortfolioItem
                          data={item}
                          key={generateKey(item.uid)}
                        />
                      ))}
                  </Fragment>
                );
              } else return null;
            })}
          </PortfolioWrapper>
        </PageWrap>
      );
    } else return null;
  }
}

export default Work;
