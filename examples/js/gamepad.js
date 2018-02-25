const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCAsvN-ORJN5cSK9I9YtLnZr9bQW0BwjgM",
  authDomain: "playsyncjs.firebaseapp.com",
  databaseURL: "https://playsyncjs.firebaseio.com",
  projectId: "playsyncjs"
}

// const PlaySync = {
// 	Gamepad: () => ({
// 		type = 'slider'
// 	} = {}) => ({
// 		type
// 	})
// }

let gamecode = document.getElementById('gamecode');
// let gamepad = PlaySync.Gamepad({type: 'slider'});
// gamepad.setFirebase(FIREBASE_CONFIG);


function GamePadApp() {

	gamecode.value = 'GSX-672'; // test 

	gamecode.addEventListener('keyup', function(event) {
		if (event.keyCode === 13) { 
			// users presses enter key and submits a game code
			console.log(gamecode.value);

		}
	});

}
function init() {
	const elements = document.querySelectorAll('.input_button').forEach((el) => {
		el.addEventListener('click', function(e) {
			let eventData = {
				value: parseInt(el.getAttribute("value"))
			}

			console.log(el.getAttribute("value"))
			// gamepad.emit(entry.name, eventData).then(function(response) {
			// 	console.log(`Value was ${response.confirmed ? 'valid' : 'invalid'}.`);
			// }).catch(function(error) {
			//   console.error(error);
			// });
		});
	});
}


let pad = GamePadApp();