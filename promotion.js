class Promotion {

    constructor(students) {
        this.students = students
    }

    getMiddleAge() {
        let totalAge = 0
        for (let i = 0; i < this.students.length; i++) {
            totalAge += this.students[i].age
        }
        let middleAge = totalAge / this.students.length
        return middleAge
    }

    getStudentCount() {
        return this.students.length
    }

    getLongestName() {
        let lengthNom = 0
        let longestName
        for (let i = 0; i < this.students.length; i++) {
            if (this.students[i].nom.length > lengthNom) {
                lengthNom = this.students[i].nom.length;
                longestName = this.students[i].nom;
            }
        }
        return longestName
    }

    getParity() {
        let male = 0
        let female = 0
        for (let i = 0; i < this.students.length; i++) {
            if (this.students[i].sexe === "M") {
                male += 1
            } else {
                female += 1
            }
        }
        let parityM = `${male*100/this.students.length} %`
        let parityF = `${female*100/this.students.length} %`
        return `${parityF} de femmes et de ${parityM} d'hommes`
    }

    getByAlphabeticOrder() {
        let alphabeticOrder = this.students.sort(function(currName, nextName) {
            if (currName.nom.toUpperCase() > nextName.nom.toUpperCase()) {
                return 1
            } else if (currName.nom.toUpperCase() < nextName.nom.toUpperCase()) {
                return -1
            } else {
                return 0
            }
        })
        let list = ""
        for (let i = 0; i < this.students.length; i++) {
            list += `${"<li>"}${this.students[i].nom} ${this.students[i].Prenom}${"</li>"}`
        }
        return list
    }

    getByAgeOrder() {
        let ageOrder = this.students.sort(function(currName, nextName) {
            if (currName.age > nextName.age) {
                return 1
            } else if (currName.age < nextName.age) {
                return -1
            } else {
                return 0
            }
        })
        let list = ""
        for (let i = 0; i < this.students.length; i++) {
            list += `${"<li>"}${this.students[i].nom} ${this.students[i].Prenom} qui a ${this.students[i].age}${"</li>"}`
        }
        return list
    }

    getStudentByGeocoding() {
        let map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: new google.maps.LatLng(45, 2.6)
        });
        let geocoder = new google.maps.Geocoder();
        geocodeAddress(geocoder, map);
        let address
        let contentString

        function getWeather(student, marker) {
            $.getJSON(`${ 'http://api.openweathermap.org/data/2.5/weather?q='}${student.city}${ '&appid=39d104ba804c4dba1133789f92fe239f'}`, function(json) {
                let main = `The Weather in ${student.city} : <br><div style="text-transform : capitalize;">${json.weather[0].description}</div>`
                let temperature = `The temperature is : ${ (json.main.temp - 273.15).toFixed(1)}°C`
                let icon = `${ 'http://openweathermap.org/img/w/'}${json.weather[0].icon}${ '.png'}`
                contentString = `<h5>${student.Prenom} ${student.nom}</h5>
                <div id="infoWeather">
                <br>
                <div class="col s9">${main}<br>${temperature}</div>
                <div class="col s3"><img src='${icon}'></div>
                </div>`
                let infowindow = new google.maps.InfoWindow({
                    content: contentString
                })
                marker.addListener('click', function() {
                    infowindow.open(map, marker)
                })
            })
        }


        function geocodeAddress(geocoder, resultsMap) {
            //$.getJSON("students.json", function(json) {
            json.forEach(function(val) {
                    geocoder.geocode({
                        'address': val.address
                    }, function(results) {
                        resultsMap.setCenter(results[0].geometry.location)
                        let marker = new google.maps.Marker({
                            map: resultsMap,
                            position: results[0].geometry.location
                        })
                        getWeather(val, marker)
                    })
                })
                //})
        }
    }

    getWeatherGame() {
        let randomNumber = 0
        let student = this.students
        let temperature
        let studentCity
        document.querySelector("#generateCity").onclick = function() {
            randomNumber = Math.round(Math.random(randomNumber) * (student.length - 1) + 0)
            studentCity = student[randomNumber].city
            document.querySelector("#showCity").innerHTML = studentCity
            $.getJSON(`${ 'http://api.openweathermap.org/data/2.5/weather?q='}${studentCity}${ '&appid=39d104ba804c4dba1133789f92fe239f&units=metric'}`, function(json) {
                temperature = json.main.temp.toFixed(0)
            })
            document.querySelector("#checkTemp").onclick = function() {
                let inputTemp = document.querySelector('#inputTemp').value
                if (isNaN(inputTemp)) {
                    document.querySelector("#showResult").innerHTML = '<p>Please enter a number</p>'
                } else if (inputTemp > temperature) {
                    document.querySelector("#showResult").innerHTML = '<p class="red">Too Hot !</p>'
                } else if (inputTemp < temperature) {
                    document.querySelector("#showResult").innerHTML = '<p class="red">Too Cold !</p>'
                } else {
                    document.querySelector("#showResult").innerHTML = '<strong class="green">Well Done !</strong>'
                }
            }
        }
    }

    getByAgeOrderTable() {
        let ageOrder = this.students.sort(function(currName, nextName) {
            if (currName.age > nextName.age) {
                return 1
            } else if (currName.age < nextName.age) {
                return -1
            } else {
                return 0
            }
        })

        let rows = []
        let icon
        let student = this.students

        for (let i = 0; i < student.length; i++) {
            function createTable() {
                let tr = document.createElement('tr')
                tr.innerHTML += `
                        <td>${icon}</td>
                        <td>${student[i].nom}</td>
                        <td>${student[i].Prenom}</td>
                        <td>${student[i].age}</td>
                        <td>${student[i].city}</td>
                        <td id="editEmail"></td>
                        <td><a href="https://github.com/${student[i].github}" target="_blank">@${student[i].github}</a></td>`
                rows.push(tr)
            }
            // $.getJSON('http://api.github.com/users/' + this.students[i].github, function(json) {
            //     icon = `<img src="${json.avatar_url}">`
                createTable()
            // })
        }
        return rows
    }
    getGithubAvatar(i) {
        $.getJSON(`http://api.github.com/users/${this.students[i].github}`, function(json) {
            let icon = json.avatar_url
            document.querySelector("#gravatar").innerHTML = '<img src=' + icon + '>'
        })
    }

}
