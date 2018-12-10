import React from 'react';
import axios from 'axios';
import { tokenUserId, authorizationHeader } from '../../lib/auth';


class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleAddedByClick = this.handleAddedByClick.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleUnlike = this.handleUnlike.bind(this);
  }

  handleAddedByClick() {
    const userId = this.state.tour.addedBy.id;
    console.log(this.state.tour.addedBy.id);
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
    console.log('this.state', this.state);
    console.log('currentUserId ====>',currentUserId);
    console.log('this.state', this.state.tour.likes);
  }

  componentDidMount() {
    axios
      .get(`/api/tours/${this.props.match.params.id}`)
      .then(result => this.setState({ tour: result.data }));
  }

  render() {
    console.log('this.state.tour =====>', this.state.tour);
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
              <p>{tour.description}</p>
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
