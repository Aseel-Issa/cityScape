const Model = require('./Model.js')
const Place = require('./Place.js')
const placeModleName = Place.getModelName()


class Trip extends Model {

    constructor(placeModel) {
        super()
        console.log('placeModleName: '+placeModleName)
        this.modelSchemaObject = {
            tripName: String,
            city: String,
            lng: Number,
            lat: Number,
            tripStart: Date,
            tripEnd: Date,
            places: [{
                place_ref_id: String,
                isVisisted: Boolean
            }],
            userId: String
        }
        this.modelName = 'TripCollection'
        this.placeModel = placeModel
    }

    assignModel(){
        this.createModel()
        // this.dbModel = this.dbManager.tripModel
    }

    async saveTrip(tripItem) {
        if (this.dbModel == undefined) {
            this.assignModel()
        }
        return await this.dbManager.saveItemToDB(this.dbModel, tripItem)
    }

    async getTrips(tripItem) {
        if (this.dbModel == undefined) {
            this.assignModel()
        }
        return await this.dbManager.getItemsFromDB(this.dbModel, tripItem)
    }

    /**
     * 
     * @param {*} filter 
     * @param {* a reference to the PlaceCollection model (Place)} placeClassInstance 
     * 
     * @return array of trips that inludes all the places information
     */
    async getTripWithAllPlacesFields(filter) {
        const trips = await this.getTrips(filter)
        const loadedTrips = []
        for(let j=0; j<trips.length; j++){
            let loadedTrip = {
                _id:trips[j]._id,
                tripName: trips[j].tripName,
                userId: trips[j].userId,
                city: trips[j].city,
                lng: trips[j].lng,
                lat: trips[j].lat,
                tripStart: trips[j].tripStart,
                tripEnd: trips[j].tripEnd,
                places: []
            }
            for(let i=0; i<trips[j].places.length; i++){
                let place = await this.placeModel.getPlaces({_id: trips[j].places[i].place_ref_id})
                loadedTrip.places.push(place[0])
            }
            loadedTrips.push(loadedTrip)

        }
        
        return loadedTrips
    }

    async updateTrip(tripItem) {
        if (this.dbModel == undefined) {
            this.assignModel()
        }
        return await this.dbManager.updateItemByIdToDB(this.dbModel, tripItem)
    }
    async removeTripById(id) {
        if (this.dbModel == undefined) {
            this.assignModel()
        }
        return await this.dbManager.removeItemByIdFromDB(this.dbModel, id)
    }
}

module.exports = Trip