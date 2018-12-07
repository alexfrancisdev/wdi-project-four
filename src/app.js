import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/home/Home';
import Explore from './components/buildings/Explore';
import Show from './components/buildings/Show';
import UserShow from './components/user/UserShow';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './scss/style.scss';
import 'bulma';


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
              <Route path="/explore/:id" component={Show}/>
              <Route path="/user/:id" component={UserShow}/>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
            </Switch>
          </main>
          <Navbar />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
