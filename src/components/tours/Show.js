import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event){
    event.preventDefault();
    axios.post(`/api/tours/${this.props.match.params.id}/comments`, this.state, authorizationHeader())
      .then(res => this.setState({ content: '', tour: res.data }));
  }

  handleChange({ target: { name, value }}){
    this.setState({ [name]: value });
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
                      <Link key={comment._id} to={`/user/${comment.user._id}`}>
                        <div className="is-vertical-center columns is-mobile">
                          <div className="is-vertical-center column is-2">
                            <figure className="is-vertical-centerlevel-left image">
                              <img className="is-rounded" src={comment.user.image}/>
                            </figure>
                          </div>
                          <div className="column is-10">
                            <p className="has-text-dark has-text-weight-bold is-size-6-mobile">{comment.user.username} </p>
                            <p className="has-text-dark is-size-6-mobile"> {comment.content}</p>
                          </div>
                        </div>
                      </Link>
                  )}
                </div>
                :
                <div className="has-text-centered">
                  <p className="column is-11 is-size-6-mobile">There are no comments on this tour.</p>
                </div>}
              <hr/>
              <form onSubmit={this.handleSubmit}>
                <input className="input" onChange={this.handleChange} value={this.state.content || ''} name="content" placeholder="Add a comment..."/>
              </form>
            </div>
            <hr/>
            <div>

            </div>
          </div>
          :
          <p className="is-size-6-mobile centered-container">Please wait...</p>}
      </div>
    );
  }
}

export default Show;
