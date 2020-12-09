const express = require('express')
const router = express.Router()
const moment = require('moment')
const axios = require('axios')
router.use(express.json())
require('dotenv').config()
const { API_KEY } = process.env





// Call to load sign-in/sign-up page

router.get('/myCityScape', async (req, res) => {


})


//Sign-up Receives a userName and password as parameters from landing page. 
//Creates a new document in the DB with userName, password, userID as attributes.

router.post('/mycityscape', async (req, res) => {

})


//Receives userName and password as parameter. 
//Checks token or returns error. Sends back saved trips list from the trip collection, if exists

router.get('/mycityscape/user/:user/trips', async (req, res) => {

})

//Receives a token. Signs out.

router.get('/mycityscape/user/:user', async (req, res) => {

})

// Receives object {tripName: , tripCity: …, searchBase: , startDate: , endDate:}. 
//Get request - get long lat
//Creates a new trip in the trips collections (with _tripID, _userID , tripName: , tripCity: …, searchBase: , startDate: , endDate: as the other attributes of the document).

router.post('/mycityscape/user/:userId/trip/:tripId', async (req, res) => {

})


// Receives token, tripID. returns Trip 

router.get('/mycityscape/user/:user/trip/:tripId', async (req, res) => {

})



// Receives a tripObject (which contains place objects). 
// update trip object in collections
//Compare places list from client side to server side:
//For each place in array check if exists in DB, if yes find _id and add to array, if not create place document, then add _id
//???split up into separate function

router.put('/mycityscape/user/:user/trip/:tripId', async (req, res) => {

})


// Receives a tripID as parameter. Marks the trip as “deleted” in the trips collection. Sends back the removed trip.

router.delete('/mycityscape/user/:user/trip/:tripId', async (req, res) => {

})






//1.  Receives a city name, sends back latitude and longitude object of that city 
router.get('/mycityscape/city/:city', async (req, res) => {
    const cityName = req.params.city
    try {
        const cityData = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${cityName}&inputtype=textquery&language=en&fields=geometry,formatted_address&key=${API_KEY}`)
        let cityLocation = cityData.data.candidates[0].geometry.location
        res.send(cityLocation)
    } catch (err) {
        res.send(err.message)
    }
})
//2. router.post - receives an object with cityName, long lat, start/end dates
// - sends to DB, DB saves, sends back. Send back to front with trip_id
router.post('/mycityscape', async (req, res) => {
// trip._id (null)
// trip.tripName
// trip.city 
// trip.searchBase (null)
// trip.lat = trip.lat || null,
// trip.lng = trip.lng || null,
// trip.tripStart = trip.tripStart
// trip.tripEnd = trip.tripEnd
// trip.places = []
})

//3. Receives lat,long and keywords, sends back array of optional places to visit
router.get('/mycityscape/city/:lat/:lng/:keyword1/:keyword2', async (req, res) => {
    const { lat } = req.params
    const { lng } = req.params
    const { keyword1 } = req.params
    const { keyword2 } = req.params
    try {
        const placesOptions = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=${keyword1}&keyword=${keyword2}&key=${API_KEY}`)
        let longPLacesArray = placesOptions.data.results
        const shortPlacesArray = longPLacesArray.map(p => {
            const obj = {
                placeID: p.place_id,
                latitude: p.geometry.location.lat,
                longitude: p.geometry.location.lng,
                name: p.name,
                rating: p.rating,
                types: p.types,
            }
            if (p.photos == undefined) {
                obj.photo = [{ photo_reference: null }]
                obj.html = [{ html_attributions: null }]
            } else {
                obj.photo = p.photos[0].photo_reference
                obj.html = p.photos[0].html_attributions
            }
            return obj
        })
        res.send(shortPlacesArray)
    } catch (err) {
        res.send(err.message)
    }
})

// Receives place Id, sends back place details
router.get('/mycityscape/moreInfo/:placeID', async (req, res) => {
    const ID = req.params.placeID
    try {
        const info = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${ID}&fields=website,opening_hours,price_level&key=${API_KEY}`)
        const moreInfo = {
            website: info.data.result.website || null,
            opening_hours: info.data.result.opening_hours.weekday_text || null,
            price_level: info.data.result.price_level || null
        }
        res.send(moreInfo)
    } catch (err) {
        res.send(err.message)
    }
})

module.exports = router





// Receives name of a place, sends back a place Information object - probably no need
// router.get('/mycityscape/place/:placeName', async (req, res) => {
//     const { placeName } = req.params
//     console.log(placeName)
//     try {
//         const place = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${placeName}&inputtype=textquery&fields=place_id,name,geometry,rating,types&language=en&key=${API_KEY}`)
//         console.log(place)
//         let placeInfo = {

//         }
//         res.send(placeInfo)
//     } catch (err) {
//         res.send(err.message)
//     }
// })