import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';



class Admin extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            error: "",
            redirectToReferer: false
        }
    }

    authenticate = (jwt, next) => {
        if (typeof window !== "undefined") {
            localStorage.setItem('jwt', JSON.stringify(jwt))
            next()
        }
    }

    handleChange = username => event => {
        this.setState({ error: "" })
        this.setState({ [username]: event.target.value });
    }

    clickSubmit = event => {
        event.preventDefault()
        this.setState({ loading: true })
        const { username, password } = this.state;
        const user = {
            username: username,
            password: password
        }
        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                return response.json()
            })
            // .catch(err => console.log(err))(user)
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error })
                }
                else {
                    this.authenticate(data, () => {
                        this.setState({ redirectToReferer: true })
                    })
                }
            })
    };


    signinForm = (username, password) => (
        <form>
            <div>
                <label>UserName</label>
                <input onChange={this.handleChange("username")} value={username} type="text" />
            </div>
            <div >
                <label>Password</label>
                <input onChange={this.handleChange("password")} value={password} type="password" />
            </div>
            <button onClick={this.clickSubmit}>Submit</button>
        </form>
    )

    render() {
        const { username, password, error, redirectToReferer } = this.state;

        if (redirectToReferer) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <h2>Admin</h2>

                <div>
                    {error}
                </div>

                {this.signinForm(username, password)}

            </div>
        )
    }
}


export default Admin;