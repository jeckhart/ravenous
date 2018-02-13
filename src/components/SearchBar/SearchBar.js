import React from 'react';
import './SearchBar.css';

const sortByOptions = {
  'Best Match': 'best_match',
  'Highest Rated': 'rating',
  'Most Reviewed': 'review_count'
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ' ',
      location: ' ',
      sortBy: 'best_match'
    };
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active';
    }
    return '';
}


  handleSortByChange(sortByOption) {
    this.setState({
      sortBy: sortByOptions[sortByOption]
      });
  }

  handleTermChange(event) {
    this.setState({
      term: event.target.value
      });
  }

  handleLocationChange(event) {
    this.setState({
      location: event.target.value
      });
  }

  handleSearch(event) {
    this.props.searchYelp(this.state.term, this.state.location,
      this.state.sortBy);
    event.preventDefault();
  }

  renderSortByOptions() {
    return (
      Object.keys(sortByOptions).map(sortByOption => {
        let sortByOptionValue = sortByOptions[sortByOption];
        return <li key={sortByOptionValue}
        className={this.getSortByClass(sortByOptionValue)}
        onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
        {sortByOption} </li>
    }));
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input placeholder="Search Businesses"
          onChange={(event) => this.handleTermChange(event)} />
          <input placeholder="Where?"
          onChange={(event) => this.handleLocationChange(event)} />
        </div>
        <div className="SearchBar-submit"
        onClick={(event) => this.handleSearch(event)}>
          <a>{"Let's Go"}</a>
        </div>
      </div>
    )
    }
  };

export default SearchBar;
