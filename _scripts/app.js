'use strict';

const url = 'https://us-street.api.smartystreets.com/street-address?key=21102174564513388&street=86%20Frontage%20Road&city=Belmont&state=MA&candidates=10';

const createRequest = function (url) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.addEventListener('readystatechange', (url) => {
        if (httpRequest.readyState === 4) {
            console.log(httpRequest.responseText);
        }
    });
    httpRequest.open('GET', url);
    httpRequest.send();
}

createRequest(url);