import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import VisitedSinglePage from '../../componentsBlog/VisitedSinglePage/VisitedSinglePage'
// import MapComponent from '../Map/Map';
// import CurrentLocation from '../Map/CurrentLocation';



const apiKey = 'JOAYveJVOUdH_pw0qNkB1KgJt_N4dxXpXaARPmtqGMGh7UMMSmkuX5HjQPJwjtAZs-oTBMbD6QAk955KSWk1-Ep4GecDpXL5dmuwTKBu41xf0Dc-rzB8BW33YOaOX3Yx';

{/* <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB1c2Bj57tJ9ny4EJafFlWeosNf3qyYg9M&callback=initMap"
    type="text/javascript"></script> */}

const mapKey = 'AIzaSyALUiIOx7GDeZ2LZNseEaVsjvZHkvac4Nw';

const mapStyles = {
    width: '100%',
    height: '100%'
};



class SinglePagePub extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            pub: '',
            latitude: null,
            longitude: null,
            post: '',
            street: '',
            city: '',
            price: '',
            photos: []
        }


        this.searchSinglePage = this.searchSinglePage.bind(this);
        this.position = this.position.bind(this);


    }



    searchSinglePage(id) {
        fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`
                }
            }
        )
            .then(response => response.json())
            .then((pub) => this.setState({
                pub: pub,
                street: pub.location.address1,
                city: pub.location.city,
                price: pub.price,
                photos: pub.photos

            }))
            .catch(error => console.error(error))
    }

    componentDidMount() {
        let id = this.props.match.params.id
        this.searchSinglePage(id);
        this.position();
    }


    position = async () => {
        await navigator.geolocation.getCurrentPosition(
            position => this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }, newState => {
                return (
                    console.log('Latitude: ', position.coords.latitude),
                    console.log('Longitude: ', position.coords.longitude)

                )
            })
        );

    }


    render() {
        return (
            <div>
                {/* {JSON.stringify(this.props)} */}
                <img src={this.state.pub.image_url} />


                <p> {this.state.pub.name}</p>

                <p>Address: {this.state.street}</p>

                <p>City: {this.state.city}</p>

                <p>Phone Number {this.state.pub.display_phone}</p>

                <p>{this.state.pub.is_closed === false ? "Open Now" : 'Closed Now'}</p>

                <p> Price: {this.state.pub.price}</p>

                <p>Photos:</p>
                {
                    this.state.photos.map((photo, i) => {
                        return (

                            <img key={i} src={photo} style={{ width: '20%' }} />
                        )
                    })
                }


                <iframe
                    title={this.state.pub.name}
                    style={{ width: '80%', height: '600px', border: 0, frameborder: "0" }}
                    src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyALUiIOx7GDeZ2LZNseEaVsjvZHkvac4Nw&origin=${this.state.latitude},${this.state.longitude}&destination=${this.state.pub.name}`} >
                </iframe>




            </div>
        )
    }
}



export default SinglePagePub
// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyALUiIOx7GDeZ2LZNseEaVsjvZHkvac4Nw'
// })(SinglePagePub);