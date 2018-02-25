const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCAsvN-ORJN5cSK9I9YtLnZr9bQW0BwjgM",
  authDomain: "playsyncjs.firebaseapp.com",
  databaseURL: "https://playsyncjs.firebaseio.com",
  projectId: "playsyncjs"
}

let gamepad = PlaySync.Gamepad({type: 'slider'});

function GamePadApp() {
	gamepad.setFirebase(FIREBASE_CONFIG);

	let out = {
		connect: () => {
			let gamecode = document.getElementById("gamecode");
			gamepad.connect(gamecode.value).then(function(platformData) {
				gamepad.login().then(function(userData) {
					console.log("game joined", userData);
					init();
				});
			});
		}
	}

	return out;
}
function init() {
	const elements = document.querySelectorAll('.input_button').forEach((el) => {
		el.addEventListener('click', function(e) {
			let eventData = {
				value: el.getAttribute("value")
			}
			// console.log(el.getAttribute("value"))
			gamepad.emit(el.getAttribute("name"), eventData).then(function(response) {
				console.log(`Value ${el.getAttribute('value')} sent`);
				// console.log(`Value was ${response.confirmed ? 'valid' : 'invalid'}.`);
			}).catch(function(error) {
			  console.error(error);
			});
		});
	});
}

let app = GamePadApp();