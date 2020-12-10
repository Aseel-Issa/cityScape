class AppManager {
    constructor() {
            }

    async signUp(username, password) {
        let userName = {
            username: username,
            password: password
        }
        userFromDatabase = await $.post('/myCityScape/createUser', userName)
        return userFromDatabase
    }

    async logIn(username, password) {
        const user = new User (await $.get('/myCityScape', "username", "password")) 
        user.isLoggedIn = true 
        return user
    }

    async logOut(user) {
       user.isLoggedIn = false         
    }
}