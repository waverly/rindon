// @flow

import React, { Component } from "react";
import { withRouter } from "react-router";

import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import ReactCSSTransitionReplace from "react-css-transition-replace";
import { injectGlobal, ThemeProvider } from "styled-components";
import { globalStyles } from "Styles/global";
import { theme } from "Styles/themes";

import Info from "./Views/Info";
import News from "./Views/News";
import Work from "./Views/Work";
import WorkDetail from "./Views/WorkDetail";
import Nav from "./Components/Nav";

import {
  apiEndpoint,
  fetchColor,
  fetchTags
} from "Utils/prismic-configuration";

injectGlobal`
	${globalStyles}
`;

const LoadWrapper = styled.div`
  transition: 1s all;
`;

const InnerLoadWrapper = styled.div`
  opacity: ${props => (props.innerLoaded ? "1" : "0")};
  transition: 1s all;
`;

class App extends Component {
  state = {
    loaded: false,
    innerLoaded: false,
    currentFilterValue: "all",
    width: 0,
    height: 0
  };

  setFilterValue = newValue => {
    this.setState({
      currentFilterValue: newValue
    });
  };

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  async componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);

    setTimeout(() => {
      this.setState({ loaded: true });
    }, 1000);

    setTimeout(() => {
      this.setState({ innerLoaded: true });
    }, 2000);

    const [tags, color] = await Promise.all([fetchTags(), fetchColor()]);

    this.setState({
      tagData: tags,
      color: color
    });

    this.setState({ currentFilterValue: "all" });

    // if (this.state.width > 768) {
    //   this.setState({ currentFilterValue: "all" });
    // } else {
    //   this.setState({ currentFilterValue: "" });
    // }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  // this sets filter back to "all" after page change
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      if (this.props.location.pathname === "/") {
        this.setState({
          currentFilterValue: "all"
        });
      }
    }
  }

  render() {
    const { color } = this.state;

    const baseTheme = {
      ...theme,
      keyColor: color
    };

    return (
      <Route
        render={({ location }) => (
          <ThemeProvider theme={baseTheme}>
            <ReactCSSTransitionReplace
              transitionName="fade-wait"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={400}
            >
              <LoadWrapper loaded={this.state.loaded} key={location.pathname}>
                <InnerLoadWrapper
                  innerLoaded={this.state.loaded}
                  key={location.pathname}
                >
                  <Nav
                    setFilterValue={this.setFilterValue}
                    currentFilterValue={this.state.currentFilterValue}
                    tags={this.state.tagData}
                    width={this.state.width}
                  />
                  <Switch location={location}>
                    <Route
                      path="/"
                      exact
                      render={props => (
                        <Work
                          keyColor={this.state.color}
                          currentFilterValue={this.state.currentFilterValue}
                        />
                      )}
                    />
                    <Route path="/work/:uid" exact component={WorkDetail} />
                    <Route path="/news" exact component={News} />
                    <Route path="/about" exact component={Info} />
                  </Switch>
                </InnerLoadWrapper>
              </LoadWrapper>
            </ReactCSSTransitionReplace>
          </ThemeProvider>
        )}
      />
    );
  }
}

export default withRouter(App);
