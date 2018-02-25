const FIREBASE_CONFIG = {
	apiKey: "AIzaSyCAsvN-ORJN5cSK9I9YtLnZr9bQW0BwjgM",
	authDomain: "playsyncjs.firebaseapp.com",
	databaseURL: "https://playsyncjs.firebaseio.com",
	projectId: "playsyncjs"
}

let usercount = 0;
let usermap = {};

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
		console.log(gamepad, user);
		if (!usermap.hasOwnProperty(user.userid)) {
			usercount+=1;
			usermap[user.userid] = "player" + usercount;
		}
		console.log(`${user.name} joined as ${usermap[user.userid]} with ${gamepad.type}.`);
	});
	
	platform.on('A', function(data, respond) {
		// data = {event, user, gamepad}
		let known = usermap.hasOwnProperty(data.user.userid);
		let player = known ? usermap[data.user.userid] : "Unknown Player";
		console.log(`${data.user.name}, ${player} emitted ${data.event.value} from ${data.gamepad.type}.`);
		let positive = data.event.value > 0 ? true : false;
		respond({
			confirmed: positive
		});
		if (known) {
			let load_ico = document.querySelector(`div.${player} > a.input_a`);
			load_ico.classList.add('is-loading');
			setTimeout(function(){ load_ico.classList.remove('is-loading'); }, 100);
		}
	});
	platform.on('D', function(data, respond) {
		// data = {event, user, gamepad}
		let known = usermap.hasOwnProperty(data.user.userid);
		let player = known ? usermap[data.user.userid] : "Unknown Player";
		console.log(`${data.user.name}, ${player} emitted ${data.event.value} from ${data.gamepad.type}.`);
		let positive = data.event.value > 0 ? true : false;
		respond({
			confirmed: positive
		});
		if (known) {
			let load_ico = document.querySelector(`div.${player} > a.input_d`);
			load_ico.classList.add('is-loading');
			setTimeout(function(){ load_ico.classList.remove('is-loading'); }, 100);
		}
	});
	platform.on('X', function(data, respond) {
		// data = {event, user, gamepad}
		let known = usermap.hasOwnProperty(data.user.userid);
		let player = known ? usermap[data.user.userid] : "Unknown Player";
		console.log(`${data.user.name}, ${player} emitted ${data.event.value} from ${data.gamepad.type}.`);
		let positive = data.event.value > 0 ? true : false;
		respond({
			confirmed: positive
		});
		if (known) {
			let load_ico = document.querySelector(`div.${player} > a.input_x`);
			load_ico.classList.add('is-loading');
			setTimeout(function(){ load_ico.classList.remove('is-loading'); }, 100);
		}
	});
	platform.on('Y', function(data, respond) {
		// data = {event, user, gamepad}
		let known = usermap.hasOwnProperty(data.user.userid);
		let player = known ? usermap[data.user.userid] : "Unknown Player";
		console.log(`${data.user.name}, ${player} emitted ${data.event.value} from ${data.gamepad.type}.`);
		let positive = data.event.value > 0 ? true : false;
		respond({
			confirmed: positive
		});
		if (known) {
			let load_ico = document.querySelector(`div.${player} > a.input_y`);
			load_ico.classList.add('is-loading');
			setTimeout(function(){ load_ico.classList.remove('is-loading'); }, 100);
		}
	});

}