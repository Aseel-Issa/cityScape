class Place {
    constructor(place) {
        this.saved = false,
        this.placeID = placeID,
        this.longitude = place.lng,
        this.latitude = place.lng,
        this.name = place.name,
        this.rating = place.rating,
        this.types = place.types,
        this.photos = place.photos,
        this.website = place.website,
        this.opening_hours = place.opening_hours,
        this.price_level = place.price_level
    }

    async findDetails(placeID) {
        
        return await $.ajax({
            url: `/mycityscape/moreinfo/:${placeID}`,
            type: 'GET'
        })
        // await $.get(`/mycityscape/moreinfo/:${placeID}`)
        // concat this object to place object
    }
}