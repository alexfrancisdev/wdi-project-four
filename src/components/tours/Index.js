import React from 'react';
import axios from 'axios';
import TourBox from './TourBox';

class TourIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkState = this.checkState.bind(this);
  }

  handleInputChange() {
    this.setState({
      query: this.search.value
    });
    let filteredTours = this.state.filteredTours;
    const tours = this.state.tours;
    const query = this.state.query;
    filteredTours = tours.filter(tour =>
      tour.name.includes(query.toLowerCase())
    );
    this.setState({ filteredTours: filteredTours });
  }

  componentDidMount() {
    axios
      .get('/api/tours')
      .then(result => this.setState({ tours: result.data, filteredTours: result.data }, this.checkState));
  }


  render() {
    return (
      <section className="centered-container">
        <div>
          <h1 className="subtitle">Take a Tour</h1>
          <form>
            <input
              placeholder="Search for..."
              ref={input => this.search = input}
              onChange={this.handleInputChange}
              className="form-input is-size-5-mobile"
            />
          </form>
        </div>
        <hr/>
        <div>
          <h1 className="subtitle">Results</h1>
          {this.state.filteredTours
            ?
            <div>
              {this.state.filteredTours && this.state.filteredTours.map(
                filteredTour => <TourBox key={filteredTour._id} filteredTour={filteredTour}/>
              )}
            </div>
            :
            <p>Please wait....</p>
          }
        </div>
      </section>
    );
  }
}

export default TourIndex;
