class Trip {
    constructor(trip) {
        this._id = trip._id || null,
        this.tripName = trip.tripName,
        this.city = trip.city,
        this.searchBase = trip.searchBase,
        this.lat = trip.lat || null,
        this.lng = trip.lng || null,
        this.tripStart = trip.tripStart
        this.tripEnd = trip.tripEnd
        this.places = []
    }

   async findPlaces(location, keywords) {
       const places = await $.get('', location, keywords)
       return places
   } 

   savePlace(place) {
       this.places.push(place)
       return this.places
   }

   async deletePlace(placeID) {
       const index = this.places.findIndex(p => p._id === placeID)
       this.places.splice(index, 1)
       return this.places
   }

//    ????
//    displayMap() {

//    }

   async saveTrip(trip) {
    if(trip._id) {
        // put route
    } else {
        const savedTrip = await $.post(``, trip)
        
    }
   }
}