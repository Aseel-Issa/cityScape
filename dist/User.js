class User {
    constructor(user) {
        this._id = user._id || null,
            this.username = user.username,
            this.password = user.password,
            this.isLoggedIn = user.isLoggedIn || false,
            this.trips = []
    }

    //adds to DB, instansiates, pushes into user's trip array
    /**
     * 
     * @param {*} tripObject example {
                        tripName: "My first trip",
                        city: "Jerusalem",
                        lng: 23.0887,
                        lat: 45.865,
                        tripStart: "2020-12-09T16:18:17.959Z",
                        tripEnd: "2020-12-09T16:18:17.959Z"
                    }
     */
    async createTrip(tripObject) {
        try {
            const location = await this.getLngLat(tripObject.city)
            tripObject.lng = location.lng
            tripObject.lat = location.lat
            const newTrip
            try {
                const result = await $.ajax({
                    url: '/mycityscape',
                    type: 'POST',
                    data: tripObject
                })
                newTrip = result
            } catch (error) {
                console.error(error);
            }
            this.trips.push(newTrip)

            return newTrip
        } catch (err) {
            console.log(err.message)
        }
    }

    // async saveTripToDB(trip) {
    //     try{
    //     const index = this.trips.findIndex(t => t._id === trip._id)
    //     await $.ajax({
    //         url: ``,
    //         method: 'PUT',
    //         success: (res) => this.trips(index, 1, res),
    //         error: function (req, msg, err) {
    //             console.log(msg)
    //             console.log(err)
    //         }


    //         return savedTrip
    //     }
    //     catch (err) {
    //         console.log(err.message)
    //     }
    // }

    async getLngLat(city) {
        const location = await $.ajax({
            url: `/mycityscape/city/${city}`,
            type: 'GET'
        })

    }

    findTrip(tripID) {
        try {
            return this.trips.filter(t => t._id === tripID)
        } catch (err) {
            console.log(err.message)
        }
    }

    // needs work sends tripId and gets back trip, instansiates trip
    async retrieveTripFromDB(tripID) {
        // await $.get(`/mycityscape/user/:${this._id}/trip/:${tripID}`)
        // return this.trips.filter(t => t._id === tripID)

        const trips = await $.ajax({
            url: `/mycityscape/user/:${this._id}/trip/:${tripID}`,
            type: 'GET'
        })
        // we are only sending the first element because by default there would be only one trip per unique id
        return trips[0]
    }

    //   added functionality of delete trip
    // deleteTrip(tripID)
    // async retrieveTrips(userID) {

    // }


}