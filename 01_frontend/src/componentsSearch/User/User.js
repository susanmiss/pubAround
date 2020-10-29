import React from 'react';
import Pub from '../Pub/Pub.js';



class User extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: ''
        }

    }

    render() {
        return (
            <p>User</p>
        )
    }
}

export default User;