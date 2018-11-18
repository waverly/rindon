// @flow

import React, { Component } from "react";
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

injectGlobal`
	${globalStyles}
`;

const firstChild = props => {
  const childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
};

const LoadWrapper = styled.div`
  background: ${props => (props.loaded ? "transparent" : "yellow")};
  transition: 1s all;
`;

const InnerLoadWrapper = styled.div`
  opacity: ${props => (props.innerLoaded ? "1" : "0")};
  transition: 1s all;
`;

class App extends Component {
  state = {
    loaded: false,
    innerLoaded: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loaded: true });
    }, 1000);

    setTimeout(() => {
      this.setState({ innerLoaded: true });
    }, 2000);
  }

  render() {
    return (
      <Route
        render={({ location }) => (
          <ThemeProvider theme={theme}>
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
                  <Nav />
                  <Switch location={location}>
                    <Route path="/" exact component={Work} />
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

export default App;

{
  /* <ThemeProvider theme={theme}>
        <div>
          <Nav />
          <Switch>
            <Route path="/" exact component={Work} />
            <Route path="/work/:uid" exact component={WorkDetail} />
            <Route path="/news" exact component={News} />
            <Route path="/about" exact component={Info} />
          </Switch>
        </div>
      </ThemeProvider> */
}
