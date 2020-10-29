import React from 'react';
import SearchBarStyle from '../SearchBar/SearchBar.css';


class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // term: '',
            location: 'milton keynes',
            // attributes: 'hot_and_new',
            sort_by: 'best_match'
        };

        // this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);


        this.sortByOptions = {
            // 'Best Match': 'best_match',
            'Best Beers Selection': 'best_match',
            'Small Distance from You': 'distance'
            // 'Best Match: 'best_match',
            // 'wheelchair Accessible': 'wheelchair_accessible',
            // 'gender_neutral_restrooms': 'gender_neutral_restrooms'
            // 'Most Reviewed': 'review_count'
            // 'Weelchair Accessible': 'weelchair_accessible',
            // 'Hot And New': 'hot_and_new'
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

    // handleTermChange(event) {
    //     this.setState({ term: event.target.value });
    // }

    handleLocationChange(event) {
        event.preventDefault();
        this.setState({ location: event.target.value });
    }

    handleSearch(event) {
        // event.preventDefault();
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
                    <a onClick={this.handleSearch}>Find me a pub!</a>
                </div>
            </div>
        );
    }
}


export default SearchBar;

// class SearchBar extends React.Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             term: '',
//             location: '',
//             filterBy: 'hot_and_new'
//         }


//         this.handleLocationChange = this.handleLocationChange.bind(this);
//         this.handleFilterByChange = this.handleFilterByChange.bind(this);
//         this.handleSearch = this.handleSearch.bind(this);

//         this.filterByOptions = {
//             'Weelchair Accessible': 'weelchair_accessible',
//             'Hot And New': 'hot_and_new'
//         }
//     }

//     getFilterByClass(filterByOption) {
//         if (this.state.filterBy === filterByOption) {
//             return 'active';
//         }
//         return '';
//     }

//     handleFilterByChange(filterByOption) {
//         this.setState({
//             filterBy: filterByOption
//         })
//     }

//     handleLocationChange(event) {
//         this.setState({
//             location: event.target.value
//         });
//     }

//     handleSearch(event) {
//         this.props.searchYelp(this.state.location, this.state.filterBy);
//         event.preventDefault();
//     }

//     renderFilterByOptions() {
//         return Object.keys(this.filterByOptions).map(
//             filterByOption => {
//                 let filterByOptionValue = this.filterByOptions[filterByOption]

//                 return <li
//                     key={filterByOptionValue}
//                     className={this.getFilterByClass(filterByOptionValue)}
//                     onClick={this.handleFilterByChange.bind(this, filterByOptionValue)}
//                 >
//                     {filterByOption}
//                 </li>
//             }
//         )
//     }

//     render() {
//         return (
//             <div className="SearchBar">
//                 <div className="SearchBar-sort-options">
//                     <ul>
//                         {this.renderFilterByOptions()}
//                     </ul>
//                 </div>
//                 <div className="SearchBar-fields">
//                     <input placeholder="Where?" onChange={this.handleLocationChange} />
//                 </div>
//                 <div className="SearchBar-submit">
//                     <a onClick={this.handleSearch}>Find me a pub!</a>
//                 </div>
//             </div>
//         )
//     }

// }

// export default SearchBar;