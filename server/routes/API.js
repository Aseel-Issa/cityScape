const express = require('express')
const router = express.Router()
const moment = require('moment')
const axios = require('axios')
router.use(express.json())
require('dotenv').config()
const { API_KEY } = process.env
const Trip = require('../models/Trip.js')
const Place = require('../models/Place.js')
const User = require('../models/User.js')
const placeModel = new Place()
const tripModel = new Trip(placeModel)
const userModel = new User()





// Call to load sign-in/sign-up page
// i don't think we need this route, because the server alreadt sends the dist folder when typing the url
router.get('/myCityScape', async (req, res) => {


})


//Sign-up Receives a userName and password as parameters from landing page. 
//Creates a new document in the DB with userName, password, userID as attributes.
/**
 * receives as an example {"userName":"jhone", "userPassword":"123"}
 * 
 * returns back user's id {_id: 8765443fgfe4657}
 */
router.post('/mycityscape/createUser', async (req, res) => {
    console.log('Reached the server in /mycityscape!')
    const user = req.body
    const savedUser = await userModel.saveUser(user)
    res.send(savedUser._id)

    // user id example 5fd125010644e7ab213566f7
})

router.get('/sanity', async (req, res) => {
    console.log('Reached the server!')
    res.end()
})


//Receives userName and password as parameter. 
//Checks token or returns error. Sends back saved trips list from the trip collection, if exists
// {"userName":"jhone", "userPassword":"123"}
router.get('/mycityscape/user/:user/trips', async (req, res) => {
    const user = req.body
    const savedUser = await userModel.getUsers(user)
    try {
        const userId = savedUser[0]._id
        const trips = await tripModel.getTripWithAllPlacesFields({ userId: userId })
        res.send(trips)
    } catch{
        res.send({ error: 'This user does not exists' })
    }
})

//Receives a token. Signs out.

// We should handle it from the clients, becuase we didn't implement the session feature
router.get('/mycityscape/user/:user', async (req, res) => {

})

// Receives object trip object{tripName: , tripCity: …, searchBase: , startDate: , endDate:}. 
//Get request - get long lat
//Creates a new trip in the trips collections (with _tripID, _userID , tripName: , tripCity: …, searchBase: , startDate: , endDate: as the other attributes of the document).

// router.put('/mycityscape/user/:userId/trip/:tripId', async (req, res) => {

// })


// Receives token, tripID. returns Trip 
// trip id 5fd125a0058a71ab52781347
router.get('/mycityscape/user/:user/trip/:tripId', async (req, res) => {
    const trip_id = req.params.tripId
    const trips = await tripModel.getTripWithAllPlacesFields({ _id: trip_id })
    res.send(trips)
})



// Receives a tripObject (which contains place objects). 
// update trip object in collections
//Compare places list from client side to server side:
//For each place in array check if exists in DB, if yes find _id and add to array, if not create place document, then add _id
//???split up into separate function
/**
 * trip object example: {
    "tripName": "My first trip",
    "city": "Jerusalem",
    "lng": 23.0887,
    "lat": 45.865,
    "tripStart": "2020-12-09T16:18:17.959Z",
    "tripEnd": "2020-12-09T16:18:17.959Z",
    "places": [
      {
        "types": [
          "any place type"
        ],
        "_id": "5fd0f8c9533c1ca749b40fb3",
        "placeID": "766542840",
        "lng": 23.4556,
        "lat": 13.4556,
        "name": "my first place to visit",
        "rating": "1",
        "photos": [
          {
            "_id": "5fd0f8c9533c1ca749b40fb4",
            "photo_reference": "908jhgvc67yhgv"
          }
        ],
        "website": "www.google.com",
        "opening_hours": "8:00 am - 2:00 pm",
        "__v": 0
      }
    ]
  }
 */
router.put('/mycityscape/user/:user/trip/:tripId', async (req, res) => {
    const newTrip = req.body
    const newPlaces = newTrip.places
    const tripId = req.params.tripId

    const tempTrip = {
        _id: tripId,
        tripName: newTrip.tripName,
        city: newTrip.city,
        lng: newTrip.lng,
        lat: newTrip.lat,
        tripStart: newTrip.tripStart,
        tripEnd: newTrip.tripEnd,
        places: []
    }
    for(let i=0; i<newPlaces.length; i++){
        let placeObj = await placeModel.savePlace(newPlaces[i])
        tempTrip.places.push({place_ref_id: placeObj._id, isVisisted: false})
    }
    // newPlaces.forEach(element => {
    //     // save place object to database
    //     let placeObj = await placeModel.savePlace(element)
    //     tempTrip.places.push({place_ref_id: placeObj._id, isVisisted: false})
    // })

    const updatedTrip = await tripModel.updateTrip(tempTrip)
    console.log('updatedTrip is: '+ updatedTrip)
    const fullTrip = await tripModel.getTripWithAllPlacesFields({_id: updatedTrip._id})
    console.log('fullTrip is: '+ fullTrip[0])
    res.send(fullTrip[0])

})


// Receives a tripID as parameter. Marks the trip as “deleted” in the trips collection. Sends back the removed trip.
// If we have time implement it
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
/**
 * trip object example
 * {
 *  "tripName": "My first trip",
    "city": "Jerusalem",
    "lng": 23.0887,
    "lat": 45.865,
    "tripStart": "2020-12-09T16:18:17.959Z",
    "tripEnd": "2020-12-09T16:18:17.959Z"
    }
 */
router.post('/mycityscape', async (req, res) => {
    const rTrip = req.body
    const trip = await tripModel.saveTrip(rTrip)
    res.send(trip)
})

//3. Receives lat,long and keywords, sends back array of optional places to visit
router.get('/mycityscape/city/:lat/:lng/:keywords', async (req, res) => {
    //'meuseum,retaurant,'
    const { lat } = req.params
    const { lng } = req.params
    const { keywords } = req.params
    try {
        const placesOptions = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=${keywords}&key=${API_KEY}`)
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