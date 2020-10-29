
const getUserPosition = () => {
    navigator.geolocation.getCurrentPosition(
        position => this.setState({
            latitudeUser: position.coords.latitude,
            longitudeUser: position.coords.longitude,

        }, newState => {
            return (
                console.log('User Latitude: ', position.coords.latitude),
                console.log('User Longitude: ', position.coords.longitude)
            )
        })
    )
    this.getDistance(this.state.latitudeUser, this.state.longitudeUser)

}

export default getUserPosition;