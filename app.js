// console.log("hey");

var form = document.getElementById('whatToDo')
// console.log(form)

form.addEventListener('submit', function(event) {
  event.preventDefault()
  // console.log(event)

  var city= event.target.elements.city.value
  // console.log(city)

  var state = event.target.elements.state.value
  // console.log(state)

  var searchURL = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=ayhkpatGvXuGboaZyKe7K8a5PfxePi7d&city=' + city + '&countryCode=US&stateCode=' + state



fetch(searchURL)
  .then(function(response) {
    return response.json()
      .then(function(eventData) {
        // console.log(eventData)
        for(var i = 0; i < eventData._embedded.events.length; i++){

          var eventName = document.createElement('h3')
          var eventDate = document.createElement('p')
          var eventVenue = document.createElement('p')
          var eventLink = document.createElement('a')

          var eventDiv = document.createElement('div')

          var eventContent = document.getElementsByClassName('event')[0]

          eventName.innerText = eventData._embedded.events[i].name
          eventDate.innerText = eventData._embedded.events[i].dates.start.localDate
          eventVenue.innerText = eventData._embedded.events[i]._embedded.venues[0].name
          eventLink.setAttribute('href', eventData._embedded.events[0].url)
          eventLink.innerText = "Click for more Info!"

          eventDiv.append(eventName, eventDate, eventVenue, eventLink)
          eventContent.append(eventDiv)
        }
      })
  })

var locationURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city + ',+' + state + '&key=AIzaSyBrmuay_QCPlGM7HYhsTCq5mERd6ammyUE'

  fetch(locationURL)
    .then(function(response){
      return response.json()
        .then(function(locationData){
          // console.log(locationData)

          var locationLocalLat =locationData.results[0].geometry.location.lat
          var locationLocalLng =locationData.results[0].geometry.location.lng


          var weatherURL = 'https://api.darksky.net/forecast/00a355506958506ea0d7685d41663ed7/' + locationLocalLat + ',' + locationLocalLng
          // console.log(weatherURL)


          fetch(weatherURL)
          .then(function(response) {
            return response.json()
              .then(function(weatherData) {
                console.log(weatherData)

              var weatherContent = document.getElementsByClassName('weather')[0]

              // var precipProb = weatherData.currently.precipProbability
              // var temp = weatherData.currently.temperature
              //   weatherContent.append('Current Temperature', + temp, 'Chance of Precipitation', precipProb)

                for(var i = 0; i <weatherData.daily.data.length; i++){
                  var dailyDiv = document.createElement('div')
                  var tempHigh = document.createElement('p')
                  var tempLow = document.createElement('p')
                  var precip = document.createElement('p')
                  var summary = document.createElement('p')

                  tempHigh.innerText = weatherData.daily.data[i].apparentTemperatureHigh

                  tempLow.innerText = weatherData.daily.data[i].apparentTemperatureLow

                  precip.innerText = weatherData.daily.data[i].precipProbability

                  summary.innerText = weatherData.daily.data[i].summary

                  console.log(weatherData.daily.data[i])
                  dailyDiv.append('High', tempHigh, 'low', tempLow, 'change of precipition', precip, summary)
                  weatherContent.append(dailyDiv)

                  dailyDiv.className = 'weatherDiv'
                }
              })
          })


        })
    })

})
