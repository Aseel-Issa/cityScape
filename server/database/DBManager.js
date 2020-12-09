
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

class DBManager {
    constructor() {
        this.url = 'mongodb://localhost/cityScapeDB'
        mongoose.connect(this.url, { useNewUrlParser: true })
    }

    /**
     * 
     * @param {String} modelName 
     * @param {the object that holds the schema attributes} modelSchemaObject 
     * @returns the model object of the schema
     */
    createModel(modelName, modelSchemaObject) {
        const Schema = mongoose.Schema
        const modelSchema = new Schema(modelSchemaObject)
        const model = mongoose.model(modelName, modelSchema)
        // console.log("Model is: "+model)
        return model
    }


    getMongooseSchema(){
        return mongoose.Schema
    }

    // getNewInstanceOfModel(model, obj){
    //     return new model(obj)
    // }

    /**
     * 
     * @param {*the model defined in mongoose} model 
     * @param {* an object to be saved in the model collection} item 
     * @returns array of mongoose documents
     */
     async saveItemToDB(model, item){
        const modelInstance = new model(item)
        // console.log("ModelInstance is: "+modelInstance)
        const response = await modelInstance.save()
        // console.log("Response after saving to db is: "+response)
        return response
    }
    async saveItemAssociatedToOtherItemToDB(mainModel, mainItem, refModel, refItem){
        const modelInstance = new mainModel(mainItem)
        const refModelInstance = new refModel(refItem)
        // console.log("ModelInstance is: "+modelInstance)
        const response = await refModelInstance.save()

        const response2 = await modelInstance.save()
         console.log("Response after saving to db is: "+response)
        return response
    }
    /**
     * 
     * @param {*the model defined in mongoose} model 
     * @param {*an object that contains the fields to search based on,if it is an empty object then it returns every document in the model} filter 
     * @returns array of mongoose documents
     */
    async getItemsFromDB(model, filter){
        const data = await model.find(filter)
      //  console.log("get data from collection: "+data)
        return data
    }
    /**
     * 
     * @param {*the model defined in mongoose} model 
     * @param {*an object that contains the fields to search based on,if it is an empty object then it removes every document in the model} filter 
     * @returns array of mongoose documents
     */
    async removeItemsFromDB(model, filter){
        const data = model.deleteMany(filter)
        return data
    }

    /**
     * 
     * @param {*the model defined in mongoose} model 
     * @param {*string} id 
     * @returns 
     */
    async removeItemByIdFromDB(model, id){
        const data = await model.findByIdAndRemove(id)
        return data
    }

    /**
     * 
     * @param {*the model defined in mongoose} model 
     * @param {*object to be updated, which should has an _id attribute} item 
     * @returns 
     */
    async updateItemByIdToDB(model, item){
        const data = await model.findOneAndUpdate({_id: item._id}, item)
        return data
    }

}

module.exports = DBManager