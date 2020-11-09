import React from 'react';
import SearchBarStyle from '../SearchBar/SearchBar.css';


class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: 'milton keynes',
            sort_by: 'best_match'

        };

        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.sortByOptions = {
            'Best Beers Selection': 'best_match',
            'Best Rated By Users': 'rating'
        };

    }

    getSortByClass(sortByOption) {
        if (this.state.sort_by === sortByOption) {
            return 'active';
        }
        return '';
    }

    handleSortByChange(sortByOption) {
        this.setState({ sort_by: sortByOption });
    }

    handleLocationChange(event) {
        event.preventDefault();
        this.setState({ location: event.target.value });
    }

    handleSearch() {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sort_by);

    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return (<li className={this.getSortByClass(sortByOptionValue)}
                key={sortByOptionValue}
                onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
                {sortByOption}
            </li>);
        });
    }

    componentDidMount() {
        this.handleSearch()
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

                    <input placeholder="Where?" onChange={this.handleLocationChange} />
                </div>
                <div className="SearchBar-submit">
                    <button onClick={this.handleSearch}>Find me a pub!</button>
                </div>
            </div>
        );
    }
}


export default SearchBar;
