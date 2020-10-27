import React from 'react';
import { Link } from 'react-router-dom'
import VisitedSinglePage from '../../componentsBlog/VisitedSinglePage/VisitedSinglePage';
import PubStyle from '../Pub/Pub.css';


class Pub extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            visited: false,
            posts: [],
            post: ''
        }

        this.getMiles = this.getMiles.bind(this)
        // this.checkVisited = this.checkVisited.bind(this)
        // this.getPost = this.getPost.bind(this)
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

    getMiles(mts) {
        const miles = mts / 1600;
        return miles.toFixed(2);
    }

    handleChange = (event, _id) => {
        this.setState({ visited: !this.state.visited })
    };


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

    //***********************?????? */



    // getPost = (posts) => {
    //     posts = this.state.posts
    //     // posts.map(post => {
    //     //     if (this.state.post.title == this.props.pub.name) {
    //     //         console.log(this.state.post.title)
    //     //     }
    //     //})
    //     // console.log(posts)

    // }

    componentDidMount() {
        this.loadPosts()
        // this.getPost()
    }


    render() {

        return (
            <div className="Pub">
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
                        <p>{this.getMiles(this.props.pub.distance)}miles from you</p>
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
                        if (post.title == this.props.pub.name) {
                            return (
                                <Link to={`/visited/${post._id}`} key={i}>{post.title} has been visited by Pub Around. Check here!</Link>
                            )
                        }

                    })
                    }
                </div>

            </div>
        )
    }
}

export default Pub;