class Promotion {

  constructor(students){
  this.createDate = new Date()
  this.students = students
  }

  getMiddleAge(){
    let totalAge = 0
    for (let i=0; i < this.students.length; i++){
      totalAge += this.students[i].age
    }
    let middleAge = totalAge / this.students.length
    return middleAge
  }

  getStudentCount(){
    return this.students.length
  }

  getLongestName(){
    let lengthNom = 0
    let longestName
    for (let i=0; i < this.students.length; i++){
      if(this.students[i].nom.length > lengthNom){
          lengthNom = this.students[i].nom.length;
          longestName = this.students[i].nom;
      }
    }
    return longestName
  }

  getParity(){
    let male = 0
    let female = 0
    for (let i=0; i < this.students.length; i++){
      if (this.students[i].sexe === "M"){
          male += 1
      }
      else{
          female += 1
      }
    }
    let parityM = `${male*100/this.students.length} %`
    let parityF = `${female*100/this.students.length} %`
    return `${parityF} de femmes et de ${parityM} d'hommes`
  }

  getByAlphabeticOrder(){
    let alphabeticOrder = this.students.sort(function (currName, nextName){
        if (currName.nom.toUpperCase() > nextName.nom.toUpperCase()){
            return 1
        }
        else if (currName.nom.toUpperCase() < nextName.nom.toUpperCase()){
            return -1
        }
        else{
            return 0
        }
    })
    let list = ""
    for (let i = 0; i < this.students.length; i++) {
      list += `${"<li>"}${this.students[i].nom} ${this.students[i].Prenom}${"</li>"}`
    }
    return list
  }

  getByAgeOrder(){
    let ageOrder = this.students.sort(function (currName, nextName){
        if (currName.age > nextName.age){
            return 1
        }
        else if (currName.age < nextName.age){
            return -1
        }
        else{
            return 0
        }
    })
    let list = ""
    for (let i = 0; i < this.students.length; i++) {
      list += `${"<li>"}${this.students[i].nom} ${this.students[i].Prenom} qui a ${this.students[i].age}${"</li>"}`
    }
    return list
  }

  getStudentByGeocoding(){
    let map = new google.maps.Map(document.getElementById('map'), {zoom: 6,center: new google.maps.LatLng(45,2.6)})
    let geocoder = new google.maps.Geocoder();
    geocodeAddress(geocoder, map);
    let address
    let contentString

    function geocodeAddress(geocoder, resultsMap) {
            json.forEach(function(val) {
                address = val.ville
                contentString = `${val.nom} ${val.Prenom}`
                let infowindow = new google.maps.InfoWindow({
                    content: contentString
                })
                geocoder.geocode({'address': address}, function(results) {
                    resultsMap.setCenter(results[0].geometry.location)
                    let marker = new google.maps.Marker({
                        map: resultsMap,
                        position: results[0].geometry.location
                    })
                    marker.addListener('click', function() {
                        infowindow.open(map, marker)
                    })
                })
                debugger
            })
        }
    }
}
/*
function geocodeAddress(geocoder, resultsMap) {
    $.getJSON("student.json", function(json) {
        json.forEach(function(val) {
            address = val.ville
            contentString = `${val.nom} ${val.Prenom}`
            let infowindow = new google.maps.InfoWindow({
                content: contentString
            })
            geocoder.geocode({'address': address}, function(results) {
                resultsMap.setCenter(results[0].geometry.location)
                let marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                })
                marker.addListener('click', function() {
                    infowindow.open(map, marker)
                })
            })
        })
    })
}
*/
