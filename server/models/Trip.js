const Model = require('./Model.js')
const Place = require('./Place.js')
const placeModleName = Place.getModelName()


class Trip extends Model {

    constructor() {
        super()
        console.log('placeModleName: '+placeModleName)
        this.modelSchemaObject = {
            tripName: String,
            city: String,
            longitude: Number,
            latitude: Number,
            tripStartDate: Date,
            tripEndDate: Date,
            places: [{
                place_ref_id: String,
                isVisisted: Boolean
            }]
        }
        this.modelName = 'TripCollection'
    }

    assignModel(){
        this.createModel()
        // this.dbModel = this.dbManager.tripModel
    }

    async saveTrip(placeItem) {
        if (this.dbModel == undefined) {
            this.assignModel()
        }
        return await this.dbManager.saveItemToDB(this.dbModel, placeItem)
    }

    async getTrips(placeItem) {
        if (this.dbModel == undefined) {
            this.assignModel()
        }
        return await this.dbManager.getItemsFromDB(this.dbModel, placeItem)
    }

    /**
     * 
     * @param {*} filter 
     * @param {* a reference to the PlaceCollection model (Place)} placeClassInstance 
     * 
     * @return array of trips that inludes all the places information
     */
    async getTripWithAllPlacesFields(filter, placeClassInstance) {
        const trips = await this.getTrips(filter)
        const loadedTrips = []
        for(let j=0; j<trips.length; j++){
            let loadedTrip = {
                tripName: trips[j].tripName,
                city: trips[j].city,
                longitude: trips[j].longitude,
                latitude: trips[j].latitude,
                tripStartDate: trips[j].tripStartDate,
                tripEndDate: trips[j].tripEndDate,
                places: []
            }
            for(let i=0; i<trips[j].places.length; i++){
                let place = await placeClassInstance.getPlaces({_id: trips[j].places[i].place_ref_id})
                loadedTrip.places.push(place[0])
            }
            loadedTrips.push(loadedTrip)

        }
        
        return loadedTrips
    }

    async updateTrip(placeItem) {
        if (this.dbModel == undefined) {
            this.assignModel()
        }
        return await this.dbManager.updateItemByIdToDB(this.dbModel, placeItem)
    }
    async removeTripById(id) {
        if (this.dbModel == undefined) {
            this.assignModel()
        }
        return await this.dbManager.removeItemByIdFromDB(this.dbModel, id)
    }
}

module.exports = Trip