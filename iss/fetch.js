let url = 'https://api.wheretheiss.at/v1/satellites/25544'

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let timeIssLocationFetched = document.querySelector('#time')


let update = 10000
let issMarker
let icon = L.icon ({
    iconUrl = 'iss_icon.png',
    iconSize = [50,50],
    iconAnchor: [25,25]
})



let map = L.map('iss-map').setView( [0, 0], 1)
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy;  <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibW9oYW11ZG9tYXIyMyIsImEiOiJja2dmazJnOTExZ3VwMnlxb3pvMGRhZmtiIn0.yHLLRC6u7ayHqrOczHJ5qQ'
}).addTo(map)


iss()
setInterval(iss, update)


function iss() {
    fetch(url).then( res => res.json() )
 .then( (issData) => {
     console.log (issData)
     let lat = issData.latitude
     let long = issData.longitude
     issLat.innerHTML = lat
     issLong.innerHTML = long

     if(!issMarker) {
        issMarker = L.marker([lat, long], {icon: icon}).addTo(map)
     } else {
         issMarker.setLatLng([lat, long])
     }

     let now = Date()
     timeIssLocationFetched.innerHTML = `This data was fetched at ${now}`

 }).catch ( (err) => {
     console.log( 'ERROR!', err)
 })
}