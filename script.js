window.onload = function () {
    weatheInfo();
    getCoordintes();
    window.setInterval(function () { weatheInfo() }, 1000);
    focusIndexPageReg();
    createMenu();
    window.onscroll = function () { myFunction() };
    clicked();

}
function focusIndexPageReg() {
    document.getElementById('inputEmail42').focus({ preventScroll: false });
}
function focusIndexPageSign() {
    document.getElementById('inputEmail45').focus({ preventScroll: false });
}
//LOGIN REGISTER FORM
var register = document.getElementsByClassName('register')[0];
var sign = document.getElementsByClassName('sign')[0];

sign.style.marginTop = (969 / window.innerHeight * 6);
register.style.marginTop = (969 / window.innerHeight * 6);

function signingIN() {
    register.style.display = 'none';
    sign.style.display = 'block';
    focusIndexPageReg();

};
function registerIn() {
    sign.style.display = 'none';
    register.style.display = 'block';
    focusIndexPageSign()
};

// weather button

function showWeather() {
    document.getElementById('weatherWindow').style.display = 'block';
};
function hideWeather() {
    document.getElementById('weatherWindow').style.display = 'none';
};
//date
function weatheInfo() {
    var todayt = new Date();
    var seconds = todayt.getSeconds();
    var minutes = todayt.getMinutes();
    var hours = todayt.getHours();
    if (seconds < 10) {
        document.getElementById('currentTime').innerText = hours + ':' + minutes + ':0' + seconds;
    } else {
        document.getElementById('currentTime').innerText = hours + ':' + minutes + ':' + seconds;
    }
};
//city
// Step 1: Get user coordinates
function getCoordintes() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
  
    function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude.toString();
        var lng = crd.longitude.toString();
        var coordinates = [lat, lng];
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        getCity(coordinates);
        return;
  
    }
  
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
  
    navigator.geolocation.getCurrentPosition(success, error, options);
}
  
// Step 2: Get city name
function getCity(coordinates) {
    var xhr = new XMLHttpRequest();
    var lat = coordinates[0];
    var lng = coordinates[1];
  
    // Paste your LocationIQ token below.
    xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=YOUR_PRIVATE_TOKEN&lat=" +
    lat + "&lon=" + lng + "&format=json", true);
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);
  
    function processRequest(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var city = response.address.city;
            document.getElementById('currentCity').innerText=city;
            return;
        }
    }
}
  

// navigation menu

function createMenu() {


    var h1tags = document.getElementsByTagName('h1');
    var navmenu = document.getElementsByClassName('staticnav')[0];

    for (i = 0; i < h1tags.length; i++) {
        var liTag = document.createElement('ul')
        var anchorTag = document.createElement('a')

        if (h1tags[i].id.length > 0) {
            anchorTag.setAttribute('href', "#" + h1tags[i].id)

        } else {
            anchorTag.setAttribute('href', "#" + h1tags[i].innerText)
        }

        anchorTag.innerHTML = h1tags[i].textContent
        liTag.appendChild(anchorTag)
        navmenu.appendChild(liTag)
    }
}

function clicked() {
    var menuto = document.getElementsByClassName('staticnav')[0];
    var anchorTagtwo = menuto.getElementsByTagName('a')
    for (let i = 0; i < anchorTagtwo.length; i++) {
        anchorTagtwo[i].addEventListener('click', () => resolveDOMPrecedence(i));
    }

};

function resolveDOMPrecedence(index) {
    return new Promise(resolve => {
        setTimeout(() => {
            myFunction(index);
        }, 25);
    });
}

function myFunction(parami) {

    var h1Tags = document.getElementsByTagName('h1');
    var statictag = document.getElementsByClassName('staticnav')[0]
    var ulTags = statictag.getElementsByTagName('ul');
    var index = 0;

    var scrolpx = window.pageYOffset;
    var bodyOff = window.innerHeight;
    var tocompare = scrolpx + (bodyOff * 0.4);

    for (i = 0; i < h1Tags.length; i++) {
        if (tocompare > h1Tags[i].offsetTop) {
            index = i;
        }
    };

    for (i = 0; i < h1Tags.length; i++) {
        ulTags[i].style.borderLeft = '5px solid rgba(255, 199, 199,0)';
        ulTags[i].style.fontWeight = '100';
    };


    if (parami == undefined) {
        ulTags[index].style.borderLeft = '5px solid lightblue';
        ulTags[index].style.fontWeight = '700';

    } else {
        ulTags[parami].style.borderLeft = '5px solid lightblue';
        ulTags[parami].style.fontWeight = '700';

    }

}
