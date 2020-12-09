class Trip {
    constructor(trip) {
        this.userID = userID
        this._id = trip._id || null,
        this.tripName = trip.tripName,
        this.city = trip.city,
        this.lat = trip.lat || null,
        this.lng = trip.lng || null,
        this.tripStart = trip.tripStart
        this.tripEnd = trip.tripEnd
        this.unsavedPlaces = []
        this.savedPlaces = []
        this.itinerary = []
    }

    retrievePlaceTypes() {
        return place_type = [
            'art_gallery',
            'bus_station',
            'cafe',
            'church',
            'clothing_store',
            'movie_theater',
            'mosque',
            'museum',
            'restaurant',
            'shopping_mall',
            'tourist_attraction'
        ]
    }

    async findPlaces(lat, lng, keywords) {
        try {
            const places = await $.ajax({
                url: `/mycityscape/city/:${lat}/:${lng}/:${keywords}`,
                type: 'GET'
            })
            // const places = await $.get(`/mycityscape/city/:${lat}/:${lng}/:${keywords}`)
            this.unsavedPlaces = await places.map(p => place = new Place(p))

            return this.unsavedPlaces
        } catch (err) {
            console.log(err.message)
        }
    }

    savePlace(place) {
        this.savedPlaces.push(place)
        return this.savedPlaces
    }

    deletePlace(placeID) {
        const index = this.places.findIndex(p => p._id === placeID)
        this.places.splice(index, 1)
        return this.places
    }
}

    // IMPORTANT!!!!!!!!!!!!!!!!!!
    // async updateTrip(trip) {
    //     ajax {
    //         put
    //         url: `/mycityscape/user/:${user._id}/trip/:${trip._id}`
    //         // sending trip object
    //         // return updated trip object
    //         // replacing it in trip array

    //     }
    // }

    //    ????
    //    displayMap() {

    //    }

    

// const place_type = {
//     art_gallery: 'art_gallery',
//     bus_station: 'bus_station',
//     cafe: 'cafe',
//     church: 'church',
//     clothing_store: 'clothing_store',
//     movie_theater: 'movie_theater',
//     mosque: 'mosque',
//     museum: 'museum',
//     restaurant: 'restaurant',
//     shopping_mall: 'shopping_mall',
//     tourist_attraction: 'tourist_attraction'
//  };