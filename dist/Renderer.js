class Renderer {
    constructor() {

    }

    render(templateID, containerID, input) {
        try {
            const source = $(`${templateID}`).html()
            const template = Handlebars.compile(source)
            const newHTML = template(input)
            $(`${containerID}`).empty().append(newHTML)
        } catch (err) {
            console.log(err.message)
        }
    }

    landingPage() {
        try {
            this.render('#background-pic-template', '#left-container')
            this.render('#log-in-template', '#right-container')
        } catch (err) {
            console.log(err.message)
        }
    }

    tripsPageTemplate(user) {
        try {
            if (user.trips.length >= 1) {
                this.render('#saved-trips-template', '#left-container', user.trips)
                this.render('#create-trip-template', '#right-container', user)
            } else {
                this.render('#background-pic-template', '#left-container')
                this.render('#create-trip-template', '#right-container', user)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    placesSearch(trip) {
        try {
            this.render('#places-search-template', '#left-container', trip)
        } catch (err) {
            console.log(err.message)
        }
    }

    savedPlaces(trip) {
        try {
            this.render('#saved-places-template', '#right-container', trip)
        } catch (err) {
            console.log(err.message)
        }
    } catch(err) {
        console.log(err.message)
    }
}


    //   renderMapTemplate(places) {
    //     try {
    //         const source = $('#map-template').html()
    //         const template = Handlebars.compile(source)
    //         const newHTML = template(places)
    //         $('#page-container').empty().append(newHTML)
    //     } catch (err) {
    //         console.log(err.message)
    //     }
    // }


