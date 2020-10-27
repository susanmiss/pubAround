import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
// import VisitedListStyle from '../VisitedList/VisitedListStyle';


class VisitedList extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            redirectToHome: false
        };
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

    //***********************?????? */

    componentDidMount() {
        this.loadPosts();
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

    deleteConfirmed = (_id) => {
        let answer = window.confirm('Are you sure you want to delete your post?');
        if (answer) this.deletePost(_id);
    };

    deletePost = (_id) => {
        const token = this.isAuthenticated().token;

        fetch(`${process.env.REACT_APP_API_URL}/post/${_id}`, {
            method: "DELETE",
            headers: {
                Accept: " application/json",
                "Content-type": " application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                this.loadPosts()
            })
            .catch(err => console.log(err))
    };



    render() {
        const { posts } = this.state;
        return (
            <div>
                <p>Post List</p>
                <br />
                <div>{posts.map((post, i) => {
                    return (
                        <div key={i}>
                            <div>
                                <Link to={`/visited/${post._id}`} style={{ color: "black" }}>
                                    <p>{post.title}</p>
                                    <p>{post.body}</p>
                                    <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} />
                                </Link>
                            </div>
                            {this.isAuthenticated() && (
                                <div>
                                    <Link to={`/visited/edit/${post._id}`}><button>Edit Post</button></Link>
                                    <button onClick={() => this.deleteConfirmed(post._id)}>Delete Post</button>
                                </div>
                            )}
                            <hr />

                        </div>


                    )
                })}</div>
            </div>
        )
    }
}

export default VisitedList;
