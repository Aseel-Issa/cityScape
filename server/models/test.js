
const Place = require('./Place.js')
const Trip = require('./Trip.js')
const DBManager = require('../database/dbManager.js')
const p1 = new Place()


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
                longitude: 23.0887,
                latitude: 45.865,
                tripStartDate: new Date(),
                tripEndDate: new Date(),
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

    const t1 = new Trip()
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
 test2()

const test3 = async function(){
    const manager = new DBManager()
    // manager.createAllModels()
    console.log(manager)
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

    console.log("Saved place is: "+response)
   // console.log('response._id is: '+ response._id)
   // const result = await p1.updatePlace({_id: response._id, name: 'My first place has been updated'})
//    const place = await p1.getPlaces({_id: response._id})

 //   console.log('before update: '+ result)
 //   console.log('place is: '+ place[0])
}
// test3()



