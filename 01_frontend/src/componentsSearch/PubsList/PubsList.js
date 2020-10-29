import React from 'react';
import PubsListStyle from './PubsList.css';
import Pub from '../Pub/Pub.js';
import User from '../User/User'



class PubsList extends React.Component {

    render() {
        return (

            <div className="PubList">

                {this.props.pubs.map(pub => {
                    return (

                        <Pub pub={pub} key={pub.id} user={this.props.user} />


                    );

                })}

            </div>
        )
    }
}

export default PubsList;