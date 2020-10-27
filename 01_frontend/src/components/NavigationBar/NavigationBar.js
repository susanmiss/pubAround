import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import NavigationBarStyle from '../NavigationBar/NavigationBar.css';

class NavigationBar extends React.Component {

    isAuthenticated = () => {
        if (typeof window == 'undefined') {
            return false
        }
        if (localStorage.getItem('jwt')) {
            return JSON.parse(localStorage.getItem('jwt'))
        } else {
            return false
        }
    }

    signout = () => {
        if (typeof window !== "undefined") localStorage.removeItem('jwt')
        // next();
        return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
            method: 'GET'
        })
            .then(response => {
                console.log('signout', response);
                return response.json()
            })
            .catch(err => console.log(err))
    }

    render() {
        return (

            <nav className="NavigationBar">

                <Link to="/" className="NavigationBarBrand">Pub Around</Link>

                <ul className="NavigationBarUl">


                    <li className="NavigationBarLi">
                        <Link to='/'>Home</Link>
                    </li>

                    <li className="NavigationBarLi">
                        <Link to='/about'>About</Link>
                    </li>

                    <li className="NavigationBarLi">
                        <Link to='/visited'>Visited</Link>
                    </li>

                    {this.isAuthenticated() && (

                        <ul>
                            <li className="NavigationBarLi">
                                <Link to='/visited/create'>Create Post</Link>
                            </li>

                            <li className="NavigationBarLi">
                                <Link to='/visited' onClick={() => this.signout()}>Sign OUT</Link>
                            </li>

                        </ul>

                    )}
                </ul>
            </nav>

        )
    }
}

export default withRouter(NavigationBar);