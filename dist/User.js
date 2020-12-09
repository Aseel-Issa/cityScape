class User {
    constructor(user) {
        this._id = user._id || null,
        this.username = user.username,
        this.password = user.password,
        this.isLoggedIn = user.isLoggedIn || false,
        this.trips = []
    }

    //adds to DB, instansiates, pushes into user's trip array
    async createTrip(tripObject) {
        try {
        const location = await this.getLngLat(tripObject.city)
        tripObject.lng = location.lng
        tripObject.lat = location.lat
        // const trip = await $.post('/', tripObject)
        const newTrip = new Trip(await $.post('/mycityscape', tripObject))
        this.trips.push(newTrip)

        return newTrip
        } catch (err) {
            console.log(err.message)
        }
    }


    async getLngLat(city){
        const location = await $.get('/mycityscape/city/:city', city)
        
    }

    findTrip(tripID){
        try{
           return this.trips.filter(t => t._id === tripID)
        } catch(err){
            console.log(err.message)
        }
    }

// needs work sends tripId and gets back trip, instansiates trip
    async retrieveTripFromDB(tripID){
        $.get(`/mycityscape/user/:${this._id}/trip/:${trip._id}`)
        return this.trips.filter(t => t._id === tripID)
      }

    //   added functionality of delete trip
    // deleteTrip(tripID)
    // async retrieveTrips(userID) {

    // }


}