import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios
      .get(`/api/buildings/${this.props.match.params.id}`)
      .then(result => this.setState({ building: result.data }));
  }

  render() {
    console.log('On state! =====>', this.state.building);
    const building = this.state.building;
    return(
      <div>
        {building
          ?
          <div>
            <div className="has-text-centered">
              <figure className="image is-1by1">
                <img src={building.icon} className="is-rounded"/>
              </figure>
              <h1 className="title">{building.name}</h1>
              <h1 className="subtitle">{building.architect}</h1>
              {/* <h1 className="subtitle">{building.addedBy}</h1> */}
            </div>
            <div>
              {building.comments
                ?
                <div>
                  <h1 className="is-size-5-mobile"> comments</h1>
                  {building.comments && building.comments.map(
                    comment =>
                      <div key={comment._id} className="columns is-mobile">
                        <div className="column is-1">
                          <Link to={`explore/${filteredBuilding._id}`}>
                            <figure className="image is-24x24">
                              <img className="is-rounded" src={comment.user.image}/>
                            </figure>
                          </Link>
                        </div>
                        <p className="column is-11 is-size-7-mobile">{comment.content}</p>
                      </div>
                  )

                  }
                </div>

                :
                <p>No comments</p>}
            </div>
          </div>
          :
          <p>Please wait...</p>}

      </div>
    );
  }
}

export default Show;
