class AppManager {
    constructor() {
    }

    /**
     * 
     * @param {*} username 
     * @param {*} password 
     * @returns a user object
     */
    async signUp(username, password) {
        let user = {};
        try {
            const result = await $.ajax({
                url: '/mycityscape/createUser',
                type: 'POST',
                data: {
                    userName: username,
                    userPassword: password
                }
            });
            user.username = username
            user.password = password
            user.id = result
            user.isLoggedIn = true
        } catch (error) {
            console.error(error);
        }
        return user
    }

    async logIn(username, password) {

        let user = {};
        try {
            const result = await $.ajax({
                url: '/mycityscape/user/trips',
                type: 'GET',
                data: {
                    userName: username,
                    userPassword: password
                }
            });
            user.username = username
            user.password = password
            user.id = result
            user.isLoggedIn = true
        } catch (error) {
            console.error(error);
        }
        return user
    }

    async logOut(user) {
        user.isLoggedIn = false
    }
}