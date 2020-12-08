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
}


// renderLandingPage() {
//     try {
//         const source = $('#landing-page-template').html()
//         const template = Handlebars.compile(source)
//         const newHTML = template()
//         $('#page-container').empty().append(newHTML)
//     } catch (err) {
//         console.log(err.message)
//     }
// }

    // renderTripsPageTemplate(trips) {
    //     try {
    //         const source = $('#trips-page-template').html()
    //         const template = Handlebars.compile(source)
    //         const newHTML = template(trips)
    //         $('#page-container').empty().append(newHTML)
    //     } catch (err) {
    //         console.log(err.message)
    //     }
    // }

    // renderPlacesTemplate(places) {
    //     try {
    //         const source = $('#places-template').html()
    //         const template = Handlebars.compile(source)
    //         const newHTML = template(places)
    //         $('#left-container').empty().append(newHTML)
    //     } catch (err) {
    //         console.log(err.message)
    //     }
    // }

    // renderMapTemplate(places) {
    //     try {
    //         const source = $('#map-template').html()
    //         const template = Handlebars.compile(source)
    //         const newHTML = template(places)
    //         $('#page-container').empty().append(newHTML)
    //     } catch (err) {
    //         console.log(err.message)
    //     }
    // }

//     renderSavedPlacesTemplate(savedPlaces) {
//         try {
//             const source = $('#saved-places-template').html()
//             const template = Handlebars.compile(source)
//             const newHTML = template(savedPlaces)
//             $('#right-container').empty().append(newHTML)
//         } catch (err) {
//             console.log(err.message)
//         }
//     }
// }

