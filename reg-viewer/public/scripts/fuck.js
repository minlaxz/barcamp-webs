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

const docRef = firestore.collection("Registered/");
function initApp() {
    const chkBtn = document.querySelector('#chkBtn');
    chkBtn.addEventListener("click", function () {
        docRef.get().then(function (doc){
            doc.forEach(function (doc_col){
                document.getElementById('result').innerHTML = doc_col;
            })
            
        })
        .catch(function (e){
            console.log(e);
        });
        const tel = document.getElementById('inputTel').value;
        if (tel) {
            docRef.get().then(function (doc_user) {
                if (doc_user.exists) {
                    document.getElementById('result').innerHTML = doc_user.data();
                }
            })
            .catch(function (e){
                console.log(e.message);
            })

        } else {
            document.getElementById('result').innerHTML = "Error";
        }
    });

}



window.onload = function () {
    initApp();
};