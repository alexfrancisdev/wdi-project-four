import React from 'react';
import axios from 'axios';

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleAddedByClick = this.handleAddedByClick.bind(this);
  }

  handleAddedByClick() {
    const userId = this.state.building.addedBy.id;
    console.log(this.state.building.addedBy.id);
    this.props.history.push(`/user/${userId}`);
  }

  componentDidMount() {
    axios
      .get(`/api/buildings/${this.props.match.params.id}`)
      .then(result => this.setState({ building: result.data }));
  }

  render() {
    console.log('this.state.building =====>', this.state.building);
    const building = this.state.building;
    return(
      <div className="centered-container">
        {building
          ?
          <div>
            <div className="has-text-centered">
              <figure className="image is-1by1">
                <img src={building.icon} className="is-rounded"/>
              </figure>
              <h1 className="title">{building.name}</h1>
              <h1 className="subtitle">{building.architect}</h1>
              <h1 className="subtitle is-size-6-mobile">Added by: <a onClick={this.handleAddedByClick} >{building.addedBy.username}</a></h1>
            </div>
            <hr/>
            <div>
              {building.comments.length >= 1
                ?
                <div>
                  <h1 className="is-size-5-mobile"> Comments</h1>
                  {building.comments && building.comments.map(
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
                  <p className="column is-11 is-size-7-mobile">There are no comments on this building.</p>
                </div>}
            </div>
            <hr/>
            <div>
              {building.featuredOn.length >= 1
                ?
                <div>
                  <h1 className="is-size-5-mobile">Tours</h1>
                  {building.featuredOn && building.featuredOn.map(
                    tour =>
                      <div key={tour._id}>
                        <p className="is-size-7-mobile"><strong>{tour.name}</strong>: {tour.description}</p>
                      </div>
                  )}
                </div>
                :
                <div className="has-text-centered">
                  <p className="column is-11 is-size-7-mobile">This building is not featured on any tours.</p>
                </div>}
            </div>
          </div>
          :
          <p>Please wait...</p>}
      </div>
    );
  }
}

export default Show;
