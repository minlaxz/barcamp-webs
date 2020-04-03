importScripts('https://www.gstatic.com/firebasejs/5.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.7.0/firebase-messaging.js');

var config = {
	apiKey: "AIzaSyDvgBx6qs-T_eIYJC34Ac4Rlt47x7aqTi0",
	authDomain: "barcamp-event-pwa-laxz.firebaseapp.com",
	databaseURL: "https://barcamp-event-pwa-laxz.firebaseio.com",
	projectId: "barcamp-event-pwa-laxz",
	storageBucket: "barcamp-event-pwa-laxz.appspot.com",
	messagingSenderId: "353745270539"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
// Add the public key generated from the console here.
messaging.usePublicVapidKey("BLMW9PnS21RgOVgDXHkN0b6UbB0jNW-I5TODkZqxOGxehjDnaA1yEoXgBm_-j4yF4afZ9KaoUS1BGOofw9BgiAU");


alert("Welcome to TTU BarCamp")
messaging.requestPermission()
	.then(function () {
		console.log('Notification permission granted.');
		return messaging.getToken();
	})
	.then(function (token) {
		console.log(token);
	})
	.catch(function (err) {
		console.log('Unable to get permission to notify.', err);
	})

messaging.setBackgroundMessageHandler(function (payload) {
	const title = 'Hello';
	const options = {
		body: payload.data.body
	};
	return self.registration.showNotification(title, options);
});