'use strict';

const smartyUrl = 'https://us-street.api.smartystreets.com/street-address?key=107882225040805386&street=86%20Frontage%20Road&city=Belmont&state=MA&candidates=10';

const parksUrl = 'https://developer.nps.gov/api/v1/parks?stateCode=ca&api_key=F7vTdzHdHLdBxI5n00ZP3TFCVmehOdaIDlSq0aHR';

const updateUISuccess = function (data) {
    console.log(data);
}

const updateUIError = function (error) {
    console.log(error);
}

const responseMethod = function (httpRequest) {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            updateUISuccess(httpRequest.responseText);
        } else {
            updateUIError(httpRequest.status + ':' + httpRequest.responseText)
        }
    }
}

const createRequest = function (url) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.addEventListener('readystatechange', (url) => responseMethod(httpRequest));
    httpRequest.open('GET', url);
    httpRequest.send();
}

// createRequest(url);
createRequest(parksUrl);