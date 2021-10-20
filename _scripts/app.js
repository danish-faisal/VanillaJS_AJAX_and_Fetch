'use strict';

// const smartyUrl = 'https://us-street.api.smartystreets.com/street-address?key=107882225040805386&street=86%20Frontage%20Road&city=Belmont&state=MA&candidates=10';
const smartyUrl = 'https://us-street.api.smartystreets.com/street-address?key=107882225040805386&candidates=10';
const smartyInit = {
    headers: {
        'Content-type': 'application/json',
        Host: 'us-street.api.smartystreets.com'
    }
};
const parksUrl = 'https://developer.nps.gov/api/v1/parks?stateCode=ca&api_key=F7vTdzHdHLdBxI5n00ZP3TFCVmehOdaIDlSq0aHR';
const addressField = document.querySelector('#address');
const cityField = document.querySelector('#city');
const stateField = document.querySelector('#state');
const zipField = document.querySelector('#zip');
const parkThumb = document.querySelector('#specials h2 img');
const parkSection = document.querySelector('#specials');
const parkAnchor = document.querySelector('#specials h2 a');
const parkDescription = document.querySelector('#specials p');

const smartyUpdateUISuccess = function (parsedData) {
    // const parsedData = JSON.parse(data);
    console.log(parsedData);
    const zip = parsedData[0].components.zipcode;
    const plus4 = parsedData[0].components.plus4_code;
    // console.log(zip + '-' + plus4)
    zipField.value = zip + '-' + plus4;
}

const parksUpdateUISuccess = function (parsedData) {
    // console.log(data);
    // const parsedData = JSON.parse(data);
    const parksData = parsedData.data;
    let randomnumber = Math.floor(Math.random() * (parksData.length + 1));
    parkAnchor.textContent = parksData[randomnumber].fullName;
    parkAnchor.setAttribute('href', parksData[randomnumber].url);
    parkDescription.textContent = parksData[randomnumber].description;
    parkThumb.src = "https://www.nps.gov/common/commonspot/templates/assetsCT/images/branding/logo.png";
    parkSection.classList.remove('hidden');
}

const smartyUpdateUIError = function (error) {
    console.log(error);
}

const parksUpdateUIError = function (error) {
    console.log(error);
}

// const responseMethod = function (httpRequest, succeed, fail) {
//     if (httpRequest.readyState === 4) {
//         if (httpRequest.status === 200) {
//             succeed(httpRequest.responseText);
//         } else {
//             fail(httpRequest.status + ':' + httpRequest.responseText)
//         }
//     }
// }

// const createRequest = function (url, succeed, fail) {
//     const httpRequest = new XMLHttpRequest();
//     httpRequest.addEventListener('readystatechange', (url) => responseMethod(httpRequest, succeed, fail));
//     httpRequest.open('GET', url);
//     httpRequest.send();
// }

const handleErrors = function (response) {
    if (!response.ok) {
        throw (response.status + ": " + response.statusText);
    }
    return response.json();
}

const createRequest = function (url, succeed, fail, init) {
    fetch(url, init)
        .then((response) => handleErrors(response))
        .then((data) => succeed(data))
        .catch((error) => fail(error));
}

const checkCompletion = function () {
    if (addressField.value !== '' && cityField.value !== '' && stateField.value !== '') {
        const requestUrl = smartyUrl + '&street=' + addressField.value + '&city=' + cityField.value + '&state=' + stateField.value;
        createRequest(requestUrl, smartyUpdateUISuccess, smartyUpdateUIError, smartyInit);
    }
}
// createRequest(smartyUrl);

addressField.addEventListener('blur', checkCompletion);
cityField.addEventListener('blur', checkCompletion);
stateField.addEventListener('blur', checkCompletion);

window.addEventListener('DOMContentLoaded', function () {
    createRequest(parksUrl, parksUpdateUISuccess, parksUpdateUIError);
});