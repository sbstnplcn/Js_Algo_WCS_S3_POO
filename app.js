(function() {
    'use strict'
    let request = new XMLHttpRequest()
        // (Méthode , URL, async)
    request.open('GET', 'students.json', true)

    request.onreadystatechange = function(e) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var students = JSON.parse(request.responseText)
                let promotion = new Promotion(students)
                document.getElementById('totalStudent').innerHTML = 'Promotion de : ' + promotion.getStudentCount()
                document.getElementById('middleAge').innerHTML = 'Âge moyen de : ' + promotion.getMiddleAge()
                document.getElementById('longuestName').innerHTML = 'Le nom le plus long est : ' + promotion.getLongestName()
                document.getElementById('parity').innerHTML = 'La parité est de ' + promotion.getParity()
                promotion.getWeatherGame()
                promotion.getByAgeOrderTable().map((tr) => {
                    document.getElementById('table').appendChild(tr)
                })

                document.getElementById('alphabeticOrder').innerHTML = promotion.getByAlphabeticOrder()
                document.getElementById('ageOrder').innerHTML = promotion.getByAgeOrder()
                document.getElementById('map').innerHTML = promotion.getStudentByGeocoding()




            } else {
                console.log('Oops')
            }
        }
    }


    request.send()


})()
