import React from 'react';
import PubsListStyle from './PubsList.css';
import Pub from '../Pub/Pub.js';



class PubsList extends React.Component {

    render() {
        return (
            <div className="PubList">

                {this.props.pubs.map(pub => {
                    return <Pub pub={pub} key={pub.id} />;
                })}

            </div>
        )
    }
}

export default PubsList;