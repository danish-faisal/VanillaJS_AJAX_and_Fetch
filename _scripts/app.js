'use strict';

// const smartyUrl = 'https://us-street.api.smartystreets.com/street-address?key=107882225040805386&street=86%20Frontage%20Road&city=Belmont&state=MA&candidates=10';
const smartyUrl = 'https://us-street.api.smartystreets.com/street-address?key=107882225040805386&candidates=10';
const parksUrl = 'https://developer.nps.gov/api/v1/parks?stateCode=ca&api_key=F7vTdzHdHLdBxI5n00ZP3TFCVmehOdaIDlSq0aHR';
const addressField = document.querySelector('#address');
const cityField = document.querySelector('#city');
const stateField = document.querySelector('#state');
const zipField = document.querySelector('#zip');

const smartyUpdateUISuccess = function (data) {
    const parsedData = JSON.parse(data);
    // console.log(parsedData);
    const zip = parsedData[0].components.zipcode;
    const plus4 = parsedData[0].components.plus4_code;
    // console.log(zip + '-' + plus4)
    zipField.value = zip + '-' + plus4;
}

const parksUpdateUISuccess = function (data) {
    console.log(data);
}

const smartyUpdateUIError = function (error) {
    console.log(error);
}

const parksUpdateUIError = function (error) {
    console.log(error);
}

const responseMethod = function (httpRequest, succeed, fail) {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            succeed(httpRequest.responseText);
        } else {
            fail(httpRequest.status + ':' + httpRequest.responseText)
        }
    }
}

const createRequest = function (url, succeed, fail) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.addEventListener('readystatechange', (url) => responseMethod(httpRequest, succeed, fail));
    httpRequest.open('GET', url);
    httpRequest.send();
}

const checkCompletion = function () {
    if (addressField.value !== '' && cityField.value !== '' && stateField.value !== '') {
        const requestUrl = smartyUrl + '&street=' + addressField.value + '&city=' + cityField.value + '&state=' + stateField.value;
        createRequest(requestUrl, smartyUpdateUISuccess, smartyUpdateUIError);
    }
}

// createRequest(smartyUrl);
createRequest(parksUrl, parksUpdateUISuccess, parksUpdateUIError);

addressField.addEventListener('blur', checkCompletion);
cityField.addEventListener('blur', checkCompletion);
stateField.addEventListener('blur', checkCompletion);