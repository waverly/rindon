import React, { Component, Fragment } from "react";
import { HashLink as Link } from "react-router-hash-link";
import styled from "styled-components";
import NewsItem from "Components/NewsItem";
import { generateKey } from "Utils/helpers";
import { fetchNewsPage } from "../../Utils/prismic-configuration";
import { media } from "Styles/style-utils";

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

  ${media.handheld_landscape`
    display: none;
  `};
`;

const FilterItem = styled.h2`
  margin: 0 7px;
  ${props => props.theme.typeMixins.h2};
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
  &:before {
    content: "";
    width: 0%;
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
      opacity: 1;
      width: 100%;
    }
  }
`;

const YearTitle = styled.h1`
  margin: 6rem 0px 20px 10px;
`;

const PageWrap = styled.div`
  text-align: left;
  padding: 150px 0px;
  opacity: ${props => (props.loaded ? "1" : "0")};
  transition: 1s opacity;

  @media screen and (max-width: 1000px) {
    padding: 50px 0;
  }
`;

const NewsWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  max-width: 1000px;

  ${media.handheld_landscape`
    width: 90vw;
    margin-right: auto;
  `};
`;

class News extends Component {
  state = {
    loaded: false
  };

  compare = (a, b) => {
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
  };

  compareNewsItems = (a, b) => {
    if (a.date && b.date) {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
    } else {
      return 0;
    }
  };

  async componentDidMount() {
    const data = await fetchNewsPage();

    data.sort(this.compareNewsItems);

    const allYears = data.map(r => r.year);
    let uniqueYears = allYears.filter(function(item, pos) {
      return allYears.indexOf(item) == pos;
    });
    uniqueYears.sort(this.compare);

    this.setState({ data, years: uniqueYears });

    setTimeout(() => {
      this.setState({ loaded: true });
    }, 1000);
  }

  scrollTo = year => {
    console.log("scrolling to ", year);
  };

  render() {
    if (this.state.data) {
      return (
        <PageWrap loaded={this.state.loaded}>
          <Fragment>
            <FilterItems>
              {this.state.years.map(year => {
                return (
                  <Link
                    key={generateKey(year)}
                    to={`#${year}`}
                    scroll={el =>
                      el.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                  >
                    <FilterItem active={year === this.state.activeYear}>
                      {year}
                    </FilterItem>
                  </Link>
                );
              })}
            </FilterItems>
            <NewsWrapper>
              {this.state.years.map(year => (
                <Fragment key={year}>
                  <YearTitle id={year} name={year}>
                    {year}
                  </YearTitle>
                  {this.state.data
                    .filter(i => i.year === year)
                    .map(item => (
                      <NewsItem data={item} key={generateKey(item.uid)} />
                    ))}
                </Fragment>
              ))}
            </NewsWrapper>
          </Fragment>
        </PageWrap>
      );
    } else return null;
  }
}

export default News;
