class User {
    constructor(user) {
        this._id = user._id || null,
        this.username = user.username,
        this.password = user.password,
        this.isLoggedIn = user.isLoggedIn || false,
        this.trips = []
    }

    async createTrip(tripDetails) {
        this.getLngLat(trip.city)
        const trip = await $.post('/', tripDetails)
        const newTrip = new Trip(trip)
        this.trips.push(newTrip)
        return newTrip
    }

    async getLngLat(city){
        const location = await $.get('/', city)
        tripDetails.lng = location.lng
        tripDetails.lat = location.lat
    }

    async retrieveTrips(userID) {

    }


}