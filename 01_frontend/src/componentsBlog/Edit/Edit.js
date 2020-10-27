import React from 'react';
import { Link, Redirect } from 'react-router-dom'
// import VisitedListStyle from '../VisitedList/VisitedListStyle';

class Edit extends React.Component {

    constructor() {
        super();
        this.state = {
            id: "",
            title: "",
            body: "",
            redirectToHome: false,
            error: "",
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

    singlePost = (id) => {
        return fetch(`${process.env.REACT_APP_API_URL}/post/${id}`, {
            method: "GET",
            headers: {
                Accept: " application/json"
            }
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err))
    }

    init = id => {
        this.singlePost(id).then(data => {
            if (data.error) {
                this.setState({ redirectToHome: true });
            } else {
                this.setState({
                    id: data._id,
                    title: data.title,
                    body: data.body,
                    error: ""
                });
            }
        });
    };

    edit = (id, token, post) => {
        return fetch(`${process.env.REACT_APP_API_URL}/post/${id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: post
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
    };

    componentDidMount() {
        this.postData = new FormData();
        const id = this.props.match.params.id;
        this.init(id);
    }



    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        // const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.postData.set(name, value);
        this.setState({ [name]: value });
    };



    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        // if (this.isValid()) {
        const id = this.props.match.params.id;
        const token = this.isAuthenticated().token;

        this.edit(id, token, this.postData).then(data => {
            if (data.error) this.setState({ error: data.error });
            else {
                this.setState({
                    loading: false,
                    title: "",
                    body: "",
                    redirectToHome: true
                });
            }
        });
        // }
    };

    editPostForm = (title, body) => (
        <form>
            <div >
                <label >Post Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                />
            </div>
            <div >
                <label>Title</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    value={title}
                />
            </div>

            <div className="form-group">
                <label>Body</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    value={body}
                />
            </div>



            <button
                onClick={this.clickSubmit}
            >
                Update Post
        </button>
        </form>
    );

    render() {
        const {
            id,
            title,
            body,
            redirectToHome,
            error,
        } = this.state;

        if (redirectToHome) {
            return <Redirect to={`/visited`} />;
        }

        return (
            <div>
                <h2>{title}</h2>

                <img
                    src={`${process.env.REACT_APP_API_URL
                        }/post/photo/${id}?${new Date().getTime()}`}

                    alt={title}
                />

                {this.isAuthenticated() &&
                    this.editPostForm(title, body)}

            </div>
        );
    }
}

export default Edit;

// class Edit extends React.Component {
//     constructor() {
//         super()
//         this.state = {
//             id: "",
//             title: "",
//             body: "",
//             photo: "",
//             redirectToHome: false,
//             error: ""
//         };
//     }

//     init = id => {
//         this.loadSinglePage(id).then(data => {
//             if (data.error) {
//                 this.setState({ redirectToHome: true });
//             } else {
//                 this.setState({
//                     id: data._id,
//                     title: data.title,
//                     body: data.body,
//                     error: ""
//                 });
//             }
//         });
//     };

//     loadSinglePage = (id) => {
//         return fetch(`${process.env.REACT_APP_API_URL}/post/${id}`, {
//             method: "GET",
//             headers: {
//                 Accept: " application/json"
//             }
//         })
//             .then(response => {
//                 return response.json();
//             })
//             .catch(err => console.log(err))
//     }



//     edit = (id, token, post) => {
//         return fetch(`${process.env.REACT_APP_API_URL}/post/${id}`, {
//             method: "PUT",
//             headers: {
//                 Accept: "application/json",
//                 Authorization: `Bearer ${token}`
//             },
//             body: post
//         })
//             .then(response => {
//                 return response.json();
//             })
//             .catch(err => console.log(err));
//     };

//     componentDidMount() {
//         this.postData = new FormData();
//         const id = this.props.match.params.id
//         this.init(id)
//     }

//     isAuthenticated = () => {
//         if (typeof window == 'undefined') {
//             return false
//         }
//         if (localStorage.getItem('jwt')) {
//             return JSON.parse(localStorage.getItem('jwt'))
//         } else {
//             return false
//         }
//     }

//     handleChange = name => event => {
//         this.setState({ error: "" });
//         const value = name === "photo" ? event.target.files[0] : event.target.value;

//         // const fileSize = name === "photo" ? event.target.files[0].size : 0;

//         this.postData.set(name, value);
//         this.setState({ [name]: value });

//     };


//     clickSubmit = event => {
//         event.preventDefault();
//         this.setState({ redirectToHome: true });

//         // if (this.isValid()) {

//         const token = this.isAuthenticated().token;
//         const id = this.props.match.params.id;

//         this.edit(id, token, this.postData)
//             .then(data => {
//                 if (data.error) this.setState({ error: data.error });
//                 else {
//                     this.setState({
//                         title: '',
//                         body: '',
//                         photo: '',
//                         redirectToHome: true
//                     });
//                 }
//             });
//         // }
//     };


//     render() {
//         const { title, body, photo, redirectToHome } = this.state;
//         if (redirectToHome) {
//             return <Redirect to={'/visited'} />
//         }
//         return (
//             <div>
//                 <h1>Create a New Post</h1>
//                 <form data-test="form-element">
//                     <div>
//                         <label>Post Photo</label>
//                         <input
//                             onChange={this.handleChange("photo")}
//                             type="file"
//                             accept="image/*"
//                         />
//                     </div>
//                     <div>
//                         <label>Post Title:</label>
//                         <input
//                             onChange={this.handleChange("title")}
//                             type="text"
//                             value={title}
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>My Post body:</label>
//                         <textarea
//                             onChange={this.handleChange("body")}
//                             type="text"
//                             value={body}
//                         />
//                     </div>


//                     <button onClick={this.clickSubmit}>
//                         Edit Post
//                     </button>
//                 </form>
//             </div>
//         )
//     }
// }

// export default Edit;