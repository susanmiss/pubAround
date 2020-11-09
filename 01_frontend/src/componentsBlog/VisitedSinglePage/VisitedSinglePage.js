import React from 'react';


class VisitedSinglePage extends React.Component {
    constructor() {
        super()

        this.state = {
            post: '',
            redirectToHome: false,
            redirectToSignin: false
        };

    }

    componentDidMount = () => {
        const _id = this.props.match.params.id;
        fetch(`${process.env.REACT_APP_API_URL}/post/${_id}`, {
            method: "GET",
            headers: {
                Accept: " application/json"
            }
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err))
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    this.setState({
                        post: data
                    });
                }
            });
    };


    render() {
        const { post } = this.state;
        return (
            <div>
                <h1>Single Page:</h1>
                <p>{post.title}</p>
                <p>{post.body}</p>
                <img src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`} alt="pub" />
            </div>
        )
    }
}

export default VisitedSinglePage;