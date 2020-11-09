import React from 'react';
import { Link } from 'react-router-dom'
import PubStyle from '../Pub/Pub.css';




class Pub extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visited: false,
            posts: [],
            post: '',
            latitude: '',
            longitude: '',
            addressUser: '',
            miles: '',
            distance: null
        }

    }

    position = () => {
        navigator.geolocation.getCurrentPosition(
            position => this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        );
    }


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


    loadPosts = () => {
        fetch(`${process.env.REACT_APP_API_URL}/posts`, {
            method: "GET"
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err))
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    this.setState({ posts: data.reverse() });
                }
            });
    };



    getDistance = () => {

        fetch(`https://thingproxy.freeboard.io/fetch/https://maps.googleapis.com/maps/api/directions/json?origin=${this.props.user.latitudeUser},${this.props.user.longitudeUser}&destination=${this.props.pub.latPub},${this.props.pub.longPub}&alternatives=true&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
            .then(response => response.json())
            .then((distance) => this.setState({
                distance: distance,
                miles: distance.routes[0].legs[0].distance.text
            }))
            .catch(error => console.error(error))
    }

    componentDidMount() {
        this.loadPosts()
        this.position()
        this.getDistance()
    }


    render() {

        return (

            <div className="Pub" >
                <div className="image-container">
                    <img src={this.props.pub.imageSrc} alt={this.props.pub.name} />
                </div>
                <h2>{this.props.pub.name}</h2>
                <div className="Pub-information">
                    <div className="Pub-address">
                        <p>{this.props.pub.address}</p>
                        <p>{this.props.pub.city}  {this.props.pub.state}</p>
                        <p>{this.props.pub.price}</p>

                    </div>
                    <div className="Pub-reviews">

                        <p> {this.state.miles ? this.state.miles + ' from you' : ''} </p>

                    </div>
                </div>
                <div>
                    <button>
                        <Link to={`/pub/${this.props.pub.id}`} > Let's Go!</Link>
                    </button>

                    {this.state.visited === true
                        ?
                        <button>
                            <Link to={`/visited`} >Visited By Pub Around. Check our blog here!</Link>
                        </button>

                        :
                        ''}


                    {this.isAuthenticated() && (
                        <div>
                            <input type="checkbox" onChange={this.handleChange}
                                value={this.state.visited} />Visited?
                        </div>
                    )}
                </div>

                <div>
                    {this.state.posts.map((post, i) => {
                        if (post.title === this.props.pub.name) {
                            return (
                                <Link to={`/visited/${post._id}`} key={i}>{post.title} has been visited by Pub Around. Check here!</Link>
                            )
                        }

                    })
                    }
                </div>

            </div >
        )
    }
}

export default Pub;