
const apiKey = 'h9sugkVZnqpnwvpLmpssUUn75OAVlRXQFvNOOgy1dAS44RWhDdIh-ANCDdV3CAZabDM2Aesoks4aGRsgbkoLYXX3DcaVM83HZkQB3_Npm58s188BO1d9GpGrRIiYX3Yx';

const Yelp = {
    search(term, location, sortBy) {
        return fetch(`https://thingproxy.freeboard.io/fetch/https://api.yelp.com/v3/businesses/search?term=PUB&location=${location}&sort_by=${sortBy}`,
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
                                latPub: business.coordinates.latitude,
                                longPub: business.coordinates.longitude,
                            }
                        });
                    }
                }
            )
    },

}

export default Yelp;


