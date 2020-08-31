import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

//Importing Pages

import Index from "./Pages/Index";
import Category from "./Pages/Category";
import Tag from "./Pages/Tag";
import Bookmarks from "./Pages/Bookmarks";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/category/:category" component={Category} />
            <Route exact path="/tag/:tag" component={Tag} />
            <Route exact path="/bookmarks" component={Bookmarks} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
