import React from 'react';
import axios from 'axios';
import { tokenUserId, authorizationHeader } from '../../lib/auth';

import BuildingBox from '../buildings/BuildingBox';
import TourMap from './TourMap';

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPosition: null
    };
    this.handleAddedByClick = this.handleAddedByClick.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleUnlike = this.handleUnlike.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  getLocation(pos) {
    this.setState({ userPosition: [pos.coords.latitude, pos.coords.longitude]});
  }

  handleAddedByClick() {
    const userId = this.state.tour.createdBy.id;
    this.props.history.push(`/user/${userId}`);
  }

  handleLike() {
    const currentUserId = tokenUserId();
    const likes = this.state.tour.likes;
    likes.push(currentUserId);
    this.setState({ likes: likes });
    axios.post(`/api/tours/${this.props.match.params.id}/like`, this.state, authorizationHeader());
  }

  handleUnlike() {
    const currentUserId = tokenUserId();
    const likes = this.state.tour.likes;
    likes.splice(likes.indexOf(currentUserId), 1);
    this.setState({ likes: likes });
    axios.post(`/api/tours/${this.props.match.params.id}/unlike`, this.state, authorizationHeader());
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getLocation);
    axios
      .get(`/api/tours/${this.props.match.params.id}`)
      .then(result => this.setState({ tour: result.data }));
  }

  render() {
    const tour = this.state.tour;
    return(
      <div className="centered-container">
        {tour
          ?
          <div>
            <div className="has-text-centered">
              <div className="columns is-mobile is-centered">
                <div className="column is-6">

                </div>
              </div>
              <h1 className="title">{tour.name}</h1>
              <p className="is-size-6">{tour.description}</p>
              <hr/>
              {tour.likes.length === 1
                ?
                <h1 className="subtitle is-size-6-mobile">{tour.likes.length} like</h1>
                :
                <h1 className="subtitle is-size-6-mobile">{tour.likes.length} likes</h1>}
              <h1 className="subtitle is-size-6-mobile">Added by: <a onClick={this.handleAddedByClick} >{tour.createdBy.username}</a></h1>
              {tour.likes.toString().includes(tokenUserId())
                ?
                <button onClick={this.handleUnlike} className="button">Unlike</button>
                :
                <button onClick={this.handleLike} className="button">Like</button>}
            </div>
            <hr/>
            <section className="map-container">
              <div className="box-container">
                {!this.state.userPosition && !tour.buildings
                  ?
                  <p className="is-size-6-mobile centered-container">Loading map...</p>
                  :
                  <TourMap
                    userPosition={this.state.userPosition}
                    buildings={tour.buildings} />
                }
              </div>
            </section>
            <hr/>
            <div>
              {tour.buildings && tour.buildings.map(
                filteredBuilding => <BuildingBox key={filteredBuilding._id} filteredBuilding={filteredBuilding}/>
              )}
            </div>
            <hr/>
            <div>
              {tour.comments.length >= 1
                ?
                <div>
                  <h1 className="is-size-5-mobile"> Comments</h1>
                  {tour.comments && tour.comments.map(
                    comment =>
                      <div key={comment._id} className="columns is-mobile">
                        <div className="column is-1">
                          <figure className="image is-24x24">
                            <img className="is-rounded" src={comment.user.image}/>
                          </figure>
                        </div>
                        <p className="column is-11 is-size-7-mobile">{comment.content}</p>
                      </div>
                  )}
                </div>
                :
                <div className="has-text-centered">
                  <p className="column is-11 is-size-7-mobile">There are no comments on this tour.</p>
                </div>}
            </div>
            <hr/>
            <div>

            </div>
          </div>
          :
          <p>Please wait...</p>}
      </div>
    );
  }
}

export default Show;
