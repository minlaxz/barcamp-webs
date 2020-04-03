var config = {
    apiKey: "AIzaSyDq4rBs6sl34GdMVsT-F9UyWzRLXW_T-Pw",
    authDomain: "ttu-barcamp-laxz.firebaseapp.com",
    databaseURL: "https://ttu-barcamp-laxz.firebaseio.com",
    projectId: "ttu-barcamp-laxz",
    storageBucket: "ttu-barcamp-laxz.appspot.com",
    messagingSenderId: "17835389968"
};
firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
};
firestore.settings(settings);
const data_ref = firestore.collection("reg_counter").doc("counter/");

function make_id() {
    var idtext = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 7; i++)
        idtext += possible.charAt(Math.floor(Math.random() * possible.length));

    return idtext;
}
var call = setInterval(time, 1000);
function time() {
    var d = new Date();
    document.getElementById('time').innerHTML = d.toLocaleTimeString();
}
function isx(major) {
    if (major == 1) return "Civil/";
    else if (major == 2) return "Archi/";
    else if (major == 3) return "EC/";
    else if (major == 4) return "Mech/";
    else if (major == 5) return "EP/";
    else if (major == 6) return "MC/";
    else if (major == 7) return "IT/";
    else if (major == 8) return "PE/";
    else if (major == 9) return "ChE/";
    else return "Others/";
}
function isy(year) {
    if (year == 1) return "FirstYear/";
    else if (year == 2) return "SecondYear/";
    else if (year == 3) return "ThirdYear/";
    else if (year == 4) return "FourthYear/";
    else if (year == 5) return "FifthYear/";
    else if (year == 6) return "SixthYear/";
    else return "Others/";

}

function initApp() {
    const regBtn = document.querySelector('#regBtn');
    //firebase.auth().signInAnonymously().catch(function (error) {
    //    var errorCode = error.code;
    //    var errorMessage = error.message;
    //    console.log(errorCode, errorMessage);
    //});
    //var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById('load').hidden = false;
            data_ref.onSnapshot(function (doc) {
                let counter = doc.data().data;
                document.getElementById('snap').innerHTML = counter + " of 100 users Registered.";
                if (counter >= 100) {
                    document.getElementById('regBtn').disabled = true;
                }
            });

            //console.log(user.uid);
            regBtn.addEventListener("click", function () {
                var d = new Date();
                const name = document.querySelector('#inputName4').value;
                const email = document.querySelector('#inputEmail4').value;
                const social = document.querySelector('#inputSocial4').value;
                const tel = document.querySelector('#inputTel').value;
                const major = document.querySelector('#inputMajor').value;
                const year = document.querySelector('#inputYear').value;
                const roll = document.querySelector('#inputRoll').value;
                const otherinput = document.querySelector('#inputOther').value;

                if (name && email && tel && major && year && roll) {
                    document.getElementById("detail").innerHTML = "Registered date:" + d + " Unique ID:" + user.uid;
                    user = {
                        name: name,
                        email: email,
                        social: social,
                        tel: tel,
                        major: major,
                        year: year,
                        roll: roll,
                        other: otherinput,
                        time: d.toLocaleTimeString(),
                        date: d.toLocaleDateString(),
                        uid: user.uid
                    }
                    var x = isx(user.major)
                    var y = isy(user.year)
                    const docRef = firestore.doc("Registered/" + x + y + user.roll);

                    docRef.get().then(function (doc_user) {
                        if (doc_user.exists) {
                            alert("Already Registered.")
                        } else {
                            docRef.set({
                                user_data: user
                            }).then(function () {
                                data_ref.get().then(function (doc_data) {
                                    if (doc_data.exists) {
                                        let counter = doc_data.data().data;
                                        count = counter + 1;
                                        data_ref.set({
                                            data: count
                                        }).then(function () {
                                            document.getElementById('load').hidden = true;
                                            document.querySelector('#inputName4').value = "";
                                            document.querySelector('#inputEmail4').value = "";
                                            document.querySelector('#inputSocial4').value = "";
                                            document.querySelector('#inputTel').value = "";
                                            document.querySelector('#inputMajor').value = "";
                                            document.querySelector('#inputYear').value = "";
                                            document.querySelector('#inputRoll').value = "";
                                            document.querySelector('#inputOther').value = "";
                                            alert('Thanks for Registration ...');
                                            console.log(count)
                                            setInterval(location.reload(), 3000);
                                        }).catch(function (e) {
                                            console.log(e);
                                        });
                                    } else {
                                        console.log("No such document!");
                                    }
                                }).catch(function (e) {
                                    console.log(e);
                                })
                            }).catch(function (e) {
                                alert(e);
                            })

                        }
                    })

                } else {
                    document.getElementById("detail").innerHTML = "Error, can't register";
                }
            })
        } else {

            // User is signed out.
            //document.getElementById('load').hidden = true;
            document.getElementById('detail').innerHTML = "Please Refresh The Page to sign in."
        }

    });
}

window.onload = function () {
    initApp();
};