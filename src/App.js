// @flow

import React, { Component } from "react";
import { Switch, Route, HashRouter, Link } from "react-router-dom";
import Prismic from "prismic-javascript";
import { injectGlobal, ThemeProvider } from "styled-components";
import { globalStyles } from "Styles/global";
import { theme } from "Styles/themes";

import Info from "./Views/Info";
import News from "./Views/News";
import Work from "./Views/Work";
import Nav from "./Components/Nav";

injectGlobal`
	${globalStyles}
`;

class App extends Component {
  state = {};

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Nav />
          <Switch>
            <Route path="/" exact component={Work} />
            <Route path="/news" exact component={News} />
            <Route path="/about" exact component={Info} />
          </Switch>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
