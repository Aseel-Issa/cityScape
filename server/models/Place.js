const Model = require('./Model.js')

class Place extends Model {
    constructor() {
        super()
        this.modelSchemaObject = {
            placeID: String,
            lng: Number,
            lat: Number,
            name: String,
            rating: String,
            types: [{
                type: String
            }],
            photos: [{
                photo_reference: String
            }],
            website: String,
            opening_hours: String
        }
        this.modelName = 'PlaceCollection'
    }

    static getModelName(){
        return 'PlaceCollection'
    }
    assignModel(){
        this.createModel()
    }
    async savePlace(placeItem){

        /**
         * @TODO
         * check if the place object exists in the database, then just return the saved object
         */
        if(this.dbModel == undefined){
            this.assignModel()
        }
        // Will return only one item, because we have unique id per place
        const checkedPlace = await this.getPlaces(placeItem)
       // console.log('checkedPlace is: '+checkedPlace[0]._id)
        if (checkedPlace[0]._id!=undefined){
          //  console.log('in if statement')
            return checkedPlace[0]
        }
       // console.log('after if statement')
        return await this.dbManager.saveItemToDB(this.dbModel, placeItem)
    }

    async getPlaces(placeItem){
        if(this.dbModel == undefined){
            this.assignModel()
        }
        return await this.dbManager.getItemsFromDB(this.dbModel, placeItem)
    }
    async updatePlace(placeItem){
        if(this.dbModel == undefined){
            this.assignModel()
        }
        return await this.dbManager.updateItemByIdToDB(this.dbModel, placeItem)
    }
    async removePlaceById(id){
        if(this.dbModel == undefined){
            this.assignModel()
        }
        return await this.dbManager.removeItemByIdFromDB(this.dbModel, id)
    }
}

module.exports = Place