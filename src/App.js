import React from 'react';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList.js';
import SearchBar from './components/SearchBar/SearchBar.js';
import Yelp from './util/Yelp.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: []
    };
  }

  searchYelp(term, location, sortBy) {
    Yelp.search(term, location, sortBy).then(businesses => {
      this.setState({
        businesses: businesses || []
      })
    });
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={(term, location, sortBy) => this.searchYelp(term, location, sortBy)} />
        <BusinessList businesses={this.state.businesses}/>
      </div>
    );
  }
}

export default App;

/* Below is a list of some potential features to add to Ravenous:

Make addresses clickable and have them open the address in Google Maps in a new tab
Make images clickable and have them open the business' website in a new tab
Clicking on a different sorting option automatically requeries the Yelp API, rather than having to manually click "Let's Go" again
Implement your own type of sort (for example, by entering a distance or radius from a central location)
Allow you to search by pressing "Enter" (or "Return") on your keyboard, as opposed to manually clicking
Add autocompletion of addresses to the "Location" input */
