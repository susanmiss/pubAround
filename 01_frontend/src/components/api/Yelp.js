

const apiKey = 'JOAYveJVOUdH_pw0qNkB1KgJt_N4dxXpXaARPmtqGMGh7UMMSmkuX5HjQPJwjtAZs-oTBMbD6QAk955KSWk1-Ep4GecDpXL5dmuwTKBu41xf0Dc-rzB8BW33YOaOX3Yx';

const Yelp = {
    search(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=PUB&location=${location}&sort_by=${sortBy}`,
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                }

            }

        )
            .then(
                response => { return response.json() }
            )
            .then(
                jsonResponse => {
                    if (jsonResponse.businesses) {
                        return jsonResponse.businesses.map(business => {
                            return {
                                id: business.id,
                                imageSrc: business.image_url,
                                name: business.name,
                                address: business.location.address1,
                                city: business.location.city,
                                price: business.price,
                                distance: business.distance,
                                zipCode: business.location.zip_code,
                                latitude: business.coordinates.latitude,
                                longitude: business.coordinates.longitude,
                            }
                        });
                    }
                }
            )
    },

}

export default Yelp;