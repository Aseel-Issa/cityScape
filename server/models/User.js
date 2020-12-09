const Model = require('./Model.js')

class User extends Model {
    constructor() {
        super()
        this.modelSchemaObject = {
            userName: String,
            userPassword: String
        }
        this.modelName = 'UserCollection'
    }

    static getModelName(){
        return 'UserCollection'
    }
    assignModel(){
        this.createModel()
    }
    async saveUser(userItem){
        if(this.dbModel == undefined){
            this.assignModel()
        }
        return await this.dbManager.saveItemToDB(this.dbModel, userItem)
    }

    async getUsers(userItem){
        if(this.dbModel == undefined){
            this.assignModel()
        }
        return await this.dbManager.getItemsFromDB(this.dbModel, userItem)
    }

}

module.exports = User