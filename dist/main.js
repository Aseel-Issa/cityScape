const appManager = new AppManager()
const renderer = new Renderer()

// default
renderer.landingPage()

// // user dummy data
// let userObject = {
//     username: 'Debbie',
//     password: 'Debbie',
// }

//without back-end
// let user = new User(userObject)
//with back-end
// appManager.signUp(userObject.username, userObject.password)

// renderer.tripsPage(user)

//event listeners Landing Page
$('#right-container').on('click', '#log-in', async function () {
    try {
        const username = $(this).closest('.input-card').find('#username').val()
        const password = $(this).closest('#input-trip').find('#password').val()

        const user = await appManager.logIn(username, password)

        renderer.tripsPageTemplate(user)
    } catch (err) {
        console.log(err.message)
    }
})

$('#right-container').on('click', '#sign-up', async function () {
    try {
        const username = $(this).closest('.input-card').find('#username').val()
        const password = $(this).closest('#input-trip').find('#password').val()

        const user = await appManager.signUp(username, password)

        renderer.tripsPageTemplate(user)
    } catch (err) {
        console.log(err.message)
    }
})

// event listeners trips page
$('#right-container').on('click', '#create-trip', async function () {
    try {
        const tripObject = {
            tripName: $(this).closest('#input-trip').find('#trip-name').val(),
            city: $(this).closest('#input-trip').find('#trip-city').val(),
            startDate: $(this).closest('#input-trip').find('#start-date').val(),
            endDate: $(this).closest('#input-trip').find('#start-date').val()
        }
        const trip = await user.createTrip(tripObject)
        
        renderer.placesSearch(trip)
        renderer.savedPlaces(trip)        
    } catch (err) {
        console.log(err.message)
    }
})

$('#left-container').on('click', '.trip-card', async function () {
    try {
        const trip = await user.findTrip($(this).data('trip-id'))

        renderer.placesSearch(trip)
        renderer.savedPlaces(trip)
    } catch (err) {
        console.log(err.message)
    }
})

//on My Trip page
$('#left-container').on('click', '#search-places', async function () {
    try {
        const trip = await user.trips.filter(t => t._id === this.data('trip-id'))
        //feature: want to get from input
        const keywords = ('tourist_attraction,museum,restaurant')
        if (trip.unsavedPaces.length >= 1){
            renderer.placesSearch(trip, trip.unsavedPlaces)
        } else {
            const places = await trip.findPlaces(trip.lat, trip.lng, keywords)
            renderer.placesSearch(trip, places)
        }
    } catch (err) {
        console.log(err.message)
    }
})

$('#left-container').on('click', '.save-place', async function () {
    try {
        const trip = await user.retrieveTrip(this.data('trip-id'))
        const placeID = await this.data('place-id')
        if (trip.places.find(placeID)){
            alert('You have already saved this location')
        } else {
        const savedPlaces = await trip.savePlace(place)
        }

        renderer.savedPlaces(savedPlaces)
    } catch (err) {
        console.log(err.message)
    }
})

$('#left-container').on('click', '.more-info', async function () {
    try {
        const trip = await user.retrieveTrip(this.data('trip-id'))
        const placeID = await this.data('place-id')
        if (trip.places.find(placeID)){
            alert('You have already saved this location')
        } else {
        const savedPlaces = await trip.savePlace(place)
        }

        renderer.savedPlaces(savedPlaces)
    } catch (err) {
        console.log(err.message)
    }
})


// saved places
$('#right-container').on('click', '#update-trip-in-db', async function () {
    try {
        const trip = await user.retrieveTrip($(this).closest.$('#saved-places-collection').data('trip-id'))
        user.saveTripToDB()

        renderer.savedPlaces(savedPlaces)
    } catch (err) {
        console.log(err.message)
    }
})


$('#right-container').on('click', '.remove-place', async function () {
    try {
        const trip = await user.retrieveTrip(this.data('trip-id'))
        const placeID = await this.data('place-id')
        if (trip.places.find(placeID)){
            alert('You have already saved this location')
        } else {
        const savedPlaces = await trip.savePlace(place)
        }

        renderer.savedPlaces(savedPlaces)
    } catch (err) {
        console.log(err.message)
    }
})