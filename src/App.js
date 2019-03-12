import React, { Component, Fragment } from 'react';
import NavBar from './components/navBar/NavBar';
import Main from './containers/main/Main';
import HighScore from './containers/highScore/HighScore';
import Settings from './containers/settings/Settings';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  
  render() {
    return (
      <React.Fragment>        
        <BrowserRouter>
          <Fragment>
            <NavBar/>
            <Switch>
              <Route path="/" component={Main} exact />
              <Route path="/highscore" component={HighScore} />
              <Route path="/configuration" component={Settings} />
            </Switch>
          </Fragment>        
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
