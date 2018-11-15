// @flow

import React, { Component } from "react";
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

class App extends Component {
  state = {};

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
              <div key={location.pathname}>
                <Nav />
                <Switch location={location}>
                  {/* <Route path="/" component={Nav} /> */}
                  <Route path="/" exact component={Work} />
                  <Route path="/work/:uid" exact component={WorkDetail} />
                  <Route path="/news" exact component={News} />
                  <Route path="/about" exact component={Info} />
                </Switch>
              </div>
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
