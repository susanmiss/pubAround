import React from 'react';
import './App.css';
import PubsList from '../../componentsSearch/PubsList/PubsList';
import SearchBar from '../../componentsSearch/SearchBar/SearchBar';
import Yelp from '../api/Yelp';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pubs: [],
      user: {
        latitudeUser: '',
        longitudeUser: ''
      }

    }

    this.searchYelp = this.searchYelp.bind(this);
  }


  searchYelp(term, location, attributes) {
    Yelp.search(term, location, attributes).then(
      pubs => { this.setState({ pubs: pubs }) }

    )
  }


  getUserPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => this.setState({
        user: {
          latitudeUser: position.coords.latitude,
          longitudeUser: position.coords.longitude,
        }
      })
    )

  }

  componentDidMount() {
    this.getUserPosition()
  }


  render() {
    return (
      <div className="App">
        <SearchBar searchYelp={this.searchYelp} />
        <PubsList pubs={this.state.pubs} user={this.state.user} />
      </div>
    )
  }
}

export default App;

