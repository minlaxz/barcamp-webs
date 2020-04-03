function handleReg() {
    var name =  document.getElementById('inputName4').value;
    var email = document.getElementById('inputEmail4').value;
    var social =document.getElementById('inputSocial4').value;
    var tel =   document.getElementById('inputTel').value;
    var major = document.getElementById('inputMajor').value;
    var year =  document.getElementById('inputYear').value;
    var roll =  document.getElementById('inputRoll').value;

    if (name && email && tel && major && year && roll) {
        if (name.length < 4) {
            alert('Please enter a valid name.');
            location.reload();
            return;
        }
        if (email.length < 4) {
            alert('Please enter a vaild email.');
            location.reload();
            return;
        }
        if (tel.length < 6) {
            alert('Please enter a vaild phone.');
            location.reload();
            return;
        }
        document.getElementById("detail").innerText = "Registered";
        console.log('ok');
    } else {
        document.getElementById("detail").innerHTML = "Error: can't register, Data missing.";
        console.log("Error Found");

    }

    

}

function initApp() {
    // document.getElementById('signin').disabled = false;
    document.getElementById('regBtn').hidden = false;
    //document.getElementById('detail').textContent = '';
    document.getElementById('regBtn').addEventListener('click', handleReg, false);

}

function make_id() {
    var idtext = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        idtext += possible.charAt(Math.floor(Math.random() * possible.length));

    return idtext;
}

window.onload = function () {
    const firestore = firebase.firestore();
    const settings = {
        timestampsInSnapshots: true
    };
    firestore.settings(settings);
    initApp();
};