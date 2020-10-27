import React from 'react';
import './App.css';
import PubsList from '../../componentsSearch/PubsList/PubsList';
import SearchBar from '../../componentsSearch/SearchBar/SearchBar';
import Yelp from '../api/Yelp';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { pubs: [] }

    this.searchYelp = this.searchYelp.bind(this);
  }


  searchYelp(term, location, attributes) {
    //alert(`Searching Yelp with ${term}, ${location}, ${sortBy}`);
    Yelp.search(term, location, attributes).then(
      pubs => { this.setState({ pubs: pubs }) }

    )
  }

  render() {
    return (
      <div className="App">
        <SearchBar searchYelp={this.searchYelp} />
        <PubsList pubs={this.state.pubs} />
      </div>
    )
  }
}

export default App;
