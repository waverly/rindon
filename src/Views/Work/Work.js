import React, { Component, Fragment } from "react";
import styled from "styled-components";
import Filter from "Components/Filter";
import PortfolioItem from "Components/PortfolioItem";
import { generateKey } from "Utils/helpers";
import { fetchWorkPage, fetchTags } from "../../Utils/prismic-configuration";

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
  cursor: pointer;
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
  padding: 100px 0;

  /* @media screen and (max-width: 1000px) {
    width: 100%;
  } */
`;

const YearTitle = styled.h1`
  margin: 6rem 0px 20px 10px;
`;

class Work extends Component {
  state = {};

  compare = (a, b) => {
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
  };

  async componentDidMount() {
    const [data, tags] = await Promise.all([fetchWorkPage(), fetchTags()]);
    const dataSet = data.workPageData;
    const allYears = dataSet.map(r => r.year);
    let uniqueYears = allYears.filter(function(item, pos) {
      return allYears.indexOf(item) == pos;
    });
    uniqueYears.sort(this.compare);

    this.setState({ workPageData: dataSet, tagData: tags, years: uniqueYears });
  }

  render() {
    if (this.state.workPageData) {
      return (
        <PageWrap>
          <Filter
            initialValue="all"
            render={({ currentFilterValue, setFilterValue }) => (
              <Fragment>
                <FilterItems>
                  <FilterItem
                    active={currentFilterValue === "all"}
                    onClick={() => {
                      setFilterValue("all");
                    }}
                  >
                    All
                  </FilterItem>
                  {this.state.tagData.map(tag => {
                    return (
                      <FilterItem
                        active={currentFilterValue === tag.title}
                        key={generateKey(tag.uid)}
                        onClick={() => {
                          setFilterValue(tag.title);
                        }}
                      >
                        {tag.title}
                      </FilterItem>
                    );
                  })}
                </FilterItems>
                <PortfolioWrapper>
                  {this.state.years.map(year => {
                    if (
                      this.state.workPageData
                        .filter(i => i.year === year)
                        .filter(i => {
                          return (
                            currentFilterValue === "all" ||
                            i.tags.some(tag => {
                              if (tag) {
                                return tag.title === currentFilterValue;
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
                                currentFilterValue === "all" ||
                                i.tags.some(tag => {
                                  if (tag) {
                                    return tag.title === currentFilterValue;
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
              </Fragment>
            )}
          />
        </PageWrap>
      );
    } else return null;
  }
}

export default Work;
