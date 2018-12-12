import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/home/Home';
import NewMenu from './components/NewMenu';
import Explore from './components/buildings/Explore';
import Show from './components/buildings/Show';
import NewBuilding from './components/buildings/New';
import TourIndex from './components/tours/Index';
import NewTour from './components/tours/New';
import TourShow from './components/tours/Show';
import UserShow from './components/user/UserShow';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Landing from './components/auth/Landing';
import SecureRoute from './components/auth/SecureRoute';

import 'bulma';
import './scss/style.scss';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <main>
            <Switch>
              <Route exact path="/landing" component={Landing}/>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <SecureRoute exact path="/" component={Home}/>
              <SecureRoute exact path="/explore" component={Explore}/>
              <SecureRoute exact path="/new" component={NewMenu}/>
              <SecureRoute exact path="/explore/new" component={NewBuilding}/>
              <SecureRoute path="/explore/:id" component={Show}/>
              <SecureRoute exact path="/tours" component={TourIndex}/>
              <SecureRoute exact path="/tours/new" component={NewTour}/>
              <SecureRoute path="/tours/:id/" component={TourShow}/>
              <SecureRoute path="/user/:id" component={UserShow}/>
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
