const remoteURL = "http://localhost:5002"

export default {
  getOne(id) {
    return fetch(`${remoteURL}/trails/${id}`)
    .then(result => result.json())
  },
  getAll(userId) {
    return fetch(`${remoteURL}/trails?userId=${userId}`)
    .then(result => result.json())
  },
  delete(id) {
    return fetch(`${remoteURL}/trails/${id}`, {
        method: "DELETE"

    })
    .then(result => result.json())
  },
  softDelete(id) {
    return fetch(`${remoteURL}/trails/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({archived: true})
    })
    .then(result => result.json())
  },
  post(newTrail) {
    return fetch(`${remoteURL}/trails`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTrail)
    }).then(data => data.json())
},
  update(editedTrail) {
    return fetch(`${remoteURL}/trails/${editedTrail.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedTrail)
    }).then(data => data.json());
},

  getLocation() {

    var x = document.getElementById("demo");
     if(navigator.geolocation) {navigator.geolocation.getCurrentPosition(showPosition);
    }else {
      x.innerHTML="Geolocation is not supported by this browser.";
    }


  function showPosition(position) {

    x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;

  }
  }
}






