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

    async saveTripToDB(trip) {
        try{
        const index = this.trips.findIndex(t => t._id === trip._id)
        await $.ajax({
            url: ``,
            method: 'PUT',
            success: (res) => this.trips(index, 1, res),
            error: function (req, msg, err) {
                console.log(msg)
                console.log(err)
            }


            return savedTrip
        }
        catch (err) {
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
        await $.get(`/mycityscape/user/:${this._id}/trip/:${trip._id}`)
        return this.trips.filter(t => t._id === tripID)
      }

    //   added functionality of delete trip
    // deleteTrip(tripID)
    // async retrieveTrips(userID) {

    // }


}