import React from 'react';
import axios from 'axios';
import BuildingBox from './TourBox';

class TourIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {
    this.setState({
      query: this.search.value
    });
    let filteredTours = this.state.filteredTours;
    const tours = this.state.tours;
    const query = this.state.query;
    filteredTours = tours.filter(tour =>
      tour.name.toLowerCase().startsWith(query.toLowerCase())
    );
    this.setState({ filteredTours: filteredTours });
  }

  componentDidMount() {
    axios
      .get('/api/tours')
      .then(result => this.setState({ tours: result.data, filteredTours: result.data }));
  }

  render() {
    return (
      <section>
        <div>
          <h1>Take a Tour</h1>
          <form>
            <input
              placeholder="Search for..."
              ref={input => this.search = input}
              onChange={this.handleInputChange}
              className="form-input"
            />
          </form>
        </div>
        <hr/>
        <div>
          <h1 className="subtitle">Results</h1>
          <div>
            {this.state.filteredTours && this.state.filteredTours.map(
              filteredTour => <p key={filteredTour._id} filteredTour={filteredTour}>
                {filteredTour.name}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default TourIndex;
