const FIREBASE_CONFIG = {
	apiKey: "AIzaSyCAsvN-ORJN5cSK9I9YtLnZr9bQW0BwjgM",
	authDomain: "playsyncjs.firebaseapp.com",
	databaseURL: "https://playsyncjs.firebaseio.com",
	projectId: "playsyncjs"
}

const platform = PlaySync.Platform({
	name: 'Rocket Launcher'
});

platform.setFirebase(FIREBASE_CONFIG);
platform.getCode().then((gameCode) => {
	console.log(gameCode);
	document.getElementById('gamecode').innerHTML = gameCode;
	init();
});

// Callback to set up platform logic after 
function init() {
	
	platform.when('gamepadJoined', function(gamepad, user) {
		console.log(`${user.name} joined with ${gamepad.type}.`);
	});
	
	platform.on('A', function(data, respond) {
		// data = {event, user, gamepad}
		console.log(`${data.user.name} emitted ${data.event.value} from ${data.gamepad.type}.`);
		let positive = data.event.value > 0 ? true : false;
		respond({
			confirmed: positive
		});
		let load_ico = document.querySelector('div.player1 > a.input_a');
		load_ico.classList.add('is-loading');
		setTimeout(function(){ load_ico.classList.remove('is-loading'); }, 100);
	});
	platform.on('D', function(data, respond) {
		// data = {event, user, gamepad}
		console.log(`${data.user.name} emitted ${data.event.value} from ${data.gamepad.type}.`);
		let positive = data.event.value > 0 ? true : false;
		respond({
			confirmed: positive
		});
		let load_ico = document.querySelector('div.player1 > a.input_d');
		load_ico.classList.add('is-loading');
		setTimeout(function(){ load_ico.classList.remove('is-loading'); }, 100);
	});
	platform.on('X', function(data, respond) {
		// data = {event, user, gamepad}
		console.log(`${data.user.name} emitted ${data.event.value} from ${data.gamepad.type}.`);
		let positive = data.event.value > 0 ? true : false;
		respond({
			confirmed: positive
		});
		let load_ico = document.querySelector('div.player1 > a.input_x');
		load_ico.classList.add('is-loading');
		setTimeout(function(){ load_ico.classList.remove('is-loading'); }, 100);
	});
	platform.on('Y', function(data, respond) {
		// data = {event, user, gamepad}
		console.log(`${data.user.name} emitted ${data.event.value} from ${data.gamepad.type}.`);
		let positive = data.event.value > 0 ? true : false;
		respond({
			confirmed: positive
		});
		let load_ico = document.querySelector('div.player1 > a.input_y');
		load_ico.classList.add('is-loading');
		setTimeout(function(){ load_ico.classList.remove('is-loading'); }, 100);
	});

}