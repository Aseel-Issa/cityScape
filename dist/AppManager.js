class AppManager {
    constructor() {
            }

    async signUp(username, password) {
        const user = new User(await $.post('/myCityScape', username, password))
        return user
    }

    async logIn(username, password) {
        const user = new User (await $.get('/myCityScape', username, password)) 
        user.isLoggedIn = true 
        return user
    }

    async logOut(user) {
       user.isLoggedIn = false         
    }
}