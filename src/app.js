import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
// import Navbar from './components/Navbar';
import Home from './components/home/Home';
import Explore from './components/buildings/Explore';

import './scss/style.scss';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <main>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/explore" component={Explore}/>
            </Switch>
          </main>

        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
