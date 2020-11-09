import React from 'react';
import { Redirect } from 'react-router-dom'


class Create extends React.Component {
    constructor() {
        super()
        this.state = {
            title: "",
            body: "",
            photo: "",
            redirectToHome: false,
            visited: true
        };
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

    handleChange = name => event => {
        this.setState({ error: "" });
        const value = name === "photo" ? event.target.files[0] : event.target.value;

        this.postData.set(name, value);
        this.setState({ [name]: value });

    };

    create = (token, post) => {
        return fetch(`${process.env.REACT_APP_API_URL}/post/create`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: post
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err))
    }

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ redirectToHome: true });

        const token = this.isAuthenticated().token;

        this.create(token, this.postData).then(data => {
            if (data.error) this.setState({ error: data.error });
            else {
                this.setState({
                    title: '',
                    body: '',
                    photo: ''
                });
            }
        });
    };

    componentDidMount() {
        this.postData = new FormData();
        this.setState({ user: this.isAuthenticated().user });
    }


    render() {
        const { title, body, redirectToHome } = this.state;
        if (redirectToHome) {
            return <Redirect to={'/visited'} />
        }
        return (
            <div>
                <h1>Create a New Post</h1>
                <form data-test="form-element">
                    <div>
                        <label>Post Photo</label>
                        <input
                            onChange={this.handleChange("photo")}
                            type="file"
                            accept="image/*"
                        />
                    </div>
                    <div>
                        <label>Post Title:</label>
                        <input
                            onChange={this.handleChange("title")}
                            type="text"
                            value={title}
                        />
                    </div>

                    <div className="form-group">
                        <label>My Post body:</label>
                        <textarea
                            onChange={this.handleChange("body")}
                            type="text"
                            value={body}
                        />
                    </div>


                    <button onClick={this.clickSubmit}>
                        Create Post
                    </button>
                </form>
            </div>
        )
    }
}

export default Create;