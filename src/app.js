import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/home/Home';
import Explore from './components/buildings/Explore';
import Show from './components/buildings/Show';
import TourIndex from './components/tours/Index';
import NewTour from './components/tours/New';
import TourShow from './components/tours/Show';
import UserShow from './components/user/UserShow';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Mapbox from './components/home/Mapbox';
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
              <Route exact path="/tours" component={TourIndex}/>
              <Route path="/tours/new" component={NewTour}/>
              <Route path="/tours/:id/" component={TourShow}/>
              <Route path="/user/:id" component={UserShow}/>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/mapbox" component={Mapbox} />
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
