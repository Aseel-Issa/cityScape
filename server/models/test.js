
const Place = require('./Place.js')
const Trip = require('./Trip.js')
const User = require('./User.js')
const DBManager = require('../database/dbManager.js')
const p1 = new Place()
const t1 = new Trip(p1)
const userModel = new User()



const createUser = async function(){
    const user = await userModel.saveUser({userName: 'aseel', userPassword:'123456'})
    console.log('user: '+user)
    return user._id
}
const test = async function (){
    const p1 = new Place()
    const response = await p1.savePlace({
        placeID: '766542840',
        longitude: 23.4556,
        latitude: 13.4556,
        name: 'my first place to visit',
        rating: '1',
        types: ['any place type'],
        photos: [{
            photo_reference: '908jhgvc67yhgv'
        }],
        website: 'www.google.com',
        opening_hours: '8:00 am - 2:00 pm'
    })
   // console.log('response._id is: '+ response._id)
   // const result = await p1.updatePlace({_id: response._id, name: 'My first place has been updated'})
   const place = await p1.getPlaces({_id: response._id})

 //   console.log('before update: '+ result)
 //   console.log('place is: '+ place[0])
    // console.log('place id is: '+ place[0]._id)

    const t1 = new Trip()
    const dataObject = {
                tripName: 'My first trip',
                city: 'Jerusalem',
                lng: 23.0887,
                lat: 45.865,
                tripStart: new Date(),
                tripEnd: new Date(),
                places: []
            }
            const newPlace = {place_ref_id: String(place[0]._id), isVisisted: false}
        dataObject.places.push(newPlace)
    const trip = await t1.saveTrip(dataObject)
    console.log("trip is: "+trip)



    // console.log('trip is: '+ trip)
 //   console.log('trip id is: '+ trip._id)

    //5fd0926e5144a89718a7a263
    // const results = await t1.getTrip({_id: '5fd0926e5144a89718a7a263'})
    // const results = await t1.getTripWithAllPlacesFields({_id: '5fd0926e5144a89718a7a263'})
    // const results = await p1.getPlaces({_id: '5fd0926e5144a89718a7a261'})
   // const results = await t1.getTripWithAllPlacesFields({id: trip._id})
    // console.log(results)

}

//test()

const test2 = async function(){
    //place id = 5fd09be2a3856698906ef6af
    // trip id = 5fd09be2a3856698906ef6b1

    // const t1 = new Trip()
    // const p1 = new Place()
    const results = await t1.getTrips({_id: '5fd0926e5144a89718a7a263'})
    console.log("tripe is:" +results)
    const placeId = results[0].places[0].place_ref_id
    console.log('place id is: '+placeId)
    const results2 = await p1.getPlaces({_id: placeId})
    // const results2 = await p1.getPlaces({_id: '5fd0926e5144a89718a7a261'})
    console.log("place is:" +results2)
    console.log('****************************')
    // const result4 = await p1.getPlaces({_id: '5fd0926e5144a89718a7a261'})
    // console.log('place: '+result4[0])
    const results3 = await t1.getTripWithAllPlacesFields({_id: '5fd0926e5144a89718a7a263'},p1)
     console.log("trip is:" +JSON.stringify(results3))

}
 //test2()

const test3 = async function(){
   // const iserId = '5fd0edf4adb972a5ab0526a0'//await createUser()
    const iserId = '5fd125010644e7ab213566f7'
    const response = await p1.savePlace({
        placeID: '766542840',
        lng: 23.4556,
        lat: 13.4556,
        name: 'my first place to visit',
        rating: '1',
        types: ['any place type'],
        photos: [{
            photo_reference: '908jhgvc67yhgv'
        }],
        website: 'www.google.com',
        opening_hours: '8:00 am - 2:00 pm'
    })

    try{
        const response2 = await p1.savePlace(response)
        const res = await p1.getPlaces(response2)
        console.log('it returns the same object: '+res)
    }catch{
        console.log('error')
    }

    const dataObject = {
        tripName: 'My first trip',
        userId: iserId,
        city: 'Jerusalem',
        lng: 23.0887,
        lat: 45.865,
        tripStart: new Date(),
        tripEnd: new Date(),
        places: []
    }
    const newPlace = {place_ref_id: String(response._id), isVisisted: false}
dataObject.places.push(newPlace)
const trip = await t1.saveTrip(dataObject)
// console.log("trip is: "+trip)
const results3 = await t1.getTripWithAllPlacesFields({_id: trip._id})
     console.log("trip is:" +JSON.stringify(results3))


    //console.log("Saved place is: "+response)
   // console.log('response._id is: '+ response._id)
   // const result = await p1.updatePlace({_id: response._id, name: 'My first place has been updated'})
//    const place = await p1.getPlaces({_id: response._id})

 //   console.log('before update: '+ result)
 //   console.log('place is: '+ place[0])
}
 test3()



