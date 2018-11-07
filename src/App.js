// @flow

import React, { Component } from "react";
import { Switch, Route, HashRouter, Link } from "react-router-dom";
import Prismic from "prismic-javascript";
import { injectGlobal, ThemeProvider } from "styled-components";
import { globalStyles } from "Styles/global";
import { theme } from "Styles/themes";

import Info from "./Views/Info";
import Work from "./Views/Work";
import Nav from "./Components/Nav";
import logo from "./logo.svg";

injectGlobal`
	${globalStyles}
`;

class App extends Component {
  state = {
    home: [],
    articles: [],
    posts: []
  };

  componentDidMount() {}

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Nav />
          <Switch>
            <Route path="/work" exact component={Work} />
            <Route path="/" exact component={Info} />
          </Switch>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
