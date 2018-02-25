function Gamepad(inGamepadData) {

	const gamepadData = inGamepadData;
	let userData;
	let platformData;
	let FirebaseApp;
	let db;

	const gamepad = {

		setFirebase: (config) => {
			FirebaseApp = firebase.initializeApp(config, `Gamepad ${Date.now()}`);
			db = FirebaseApp.database();
		},

		connect: (gameCode) => {
			return new Promise((resolve, reject) => {
				db.ref(`_playsync/live/${gameCode}/platform`).once('value', (snap) => {
					let val = snap.val() || {};
					platformData = val;
					resolve(val);
				});
			});
		},

		login: () => {
			return new Promise((resolve, reject) => {
				const provider = new firebase.auth.GoogleAuthProvider();
				FirebaseApp.auth().signInWithPopup(provider).then((data) => {
					const result = data.user;
					const authData = {
						userid: result.uid,
						name: result.displayName,
						email: result.email,
						image: result.photoURL
					}
					userData = authData;
					db.ref(`_playsync/live/${gameCode}/feed`).push({
						_type: 'internal',
						_name: 'gamepadJoined',
						_timestamp: Firebase.ServerValue.TIMESTAMP
						_gamepad: gamepadData,
						_user: userData
					}).then((success) => {
						resolve(authData);
					}).catch(reject);
				}).catch(reject);
			});
		},

		emit: (eventName, eventData) => {
			return new Promise((resolve, reject) => {
				/*db.ref(`_playsync/live/${gameCode}/feed`).push({
					_type: 'gamepad',
					_name: eventName,
					_timestamp: Firebase.ServerValue.TIMESTAMP
					_gamepad: gamepadData,
					_user: userData
				}).then((success) => {
					resolve(authData);
				}).catch(reject);*/
				resolve(true);
			});
		}

	}

	return gamepad;

}

function Platform() {

}

const PlaySync = {
	Gamepad: Gamepad,
	Platform: Platform
}
