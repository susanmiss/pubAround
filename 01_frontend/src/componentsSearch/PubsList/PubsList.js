import React from 'react';
import PubsListStyle from './PubsList.css';
import Pub from '../Pub/Pub.js';



class PubsList extends React.Component {

    render() {
        return (

            <div className="PubList">

                {this.props.pubs.map(pub => {
                    return (
                        <div key={pub.id}>
                            <Pub pub={pub} key={pub.id} user={this.props.user} />

                        </div>
                    );

                })}

            </div>
        )
    }
}

export default PubsList;