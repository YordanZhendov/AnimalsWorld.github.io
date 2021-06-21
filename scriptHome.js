function makeChanges() {
    var inputsUpdate = document.getElementsByClassName('profilInput');
    var inputsInfo = document.getElementsByClassName('profileInfo');
    for (let i = 0; i < inputsUpdate.length; i++) {
        var currInfo = inputsInfo[i].textContent;
        if (i == 3) {
            inputsUpdate[i].setAttribute('value', Number.parseInt(currInfo));
            inputsUpdate[i].style.display = 'block';
        }else{
            inputsUpdate[i].setAttribute('value', currInfo);
            inputsUpdate[i].style.display = 'block';
        }
    }
    for (let i = 0; i < inputsInfo.length; i++) {
        inputsInfo[i].style.display = 'none';
    }
}