const DBManager = require('../database/dbManager.js')

class Model{
    constructor(){
        this.modelSchemaObject = {}
        this.modelName = ""
        this.dbModel = undefined
        this.dbManager = new DBManager()
    }

    createModel(){
        this.dbModel = this.dbManager.createModel(this.modelName, this.modelSchemaObject)
    }

    getNewInstanceOfModel(obj){
        if (this.dbModel == undefined) {
            this.createModel()
        }
        return this.dbManager.getNewInstanceOfModel(this.dbModel, obj)
    }
}

module.exports = Model