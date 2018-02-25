(function() {

	const CAME_ALIVE = Date.now();

	function Gamepad(inGamepadData) {

		const gamepadData = inGamepadData;
		let userData;
		let platformData;
		let gameCode;
		let FirebaseApp;
		let db;

		const gamepad = {

			setFirebase: (config) => {
				FirebaseApp = firebase.initializeApp(config, `Gamepad ${Date.now()}`);
				db = FirebaseApp.database();
			},

			connect: (inGameCode) => {
				gameCode = inGameCode;
				return new Promise((resolve, reject) => {
					db.ref(`_playsync/live/${gameCode}/platform`).once('value', (snap) => {
						let val = snap.val() || {};
						platformData = val;
						resolve(val);
					});
				});
			},

			login: (forceLogin) => {
				return new Promise((resolve, reject) => {
					let savedUserStr = localStorage.getItem('playsync_user');
					if (savedUserStr && !forceLogin) {
						userData = JSON.parse(savedUserStr);
						db.ref(`_playsync/live/${gameCode}/feed`).push({
							type: 'internal',
							name: 'gamepadJoined',
							timestamp: firebase.database.ServerValue.TIMESTAMP,
							gamepad: gamepadData,
							user: userData
						}).then((done) => {
							resolve(userData);
						}).catch(reject);
					} else {
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
							let userStr = JSON.stringify(authData);
							localStorage.setItem('playsync_user', userStr);
							db.ref(`_playsync/live/${gameCode}/feed`).push({
								type: 'internal',
								name: 'gamepadJoined',
								timestamp: firebase.database.ServerValue.TIMESTAMP,
								gamepad: gamepadData,
								user: userData
							}).then((done) => {
								resolve(userData);
							}).catch(reject);
						}).catch(reject);
					}
				});
			},

			emit: (eventName, eventData) => {
				return new Promise((resolve, reject) => {
					db.ref(`_playsync/live/${gameCode}/feed`).push({
						type: 'gamepad',
						name: eventName,
						timestamp: firebase.database.ServerValue.TIMESTAMP,
						event: eventData,
						gamepad: gamepadData,
						user: userData
					}).then((done) => {
						let pathPieces = done.path.n;
	      				let pushCode = pathPieces[pathPieces.length - 1];
						let respRef = db.ref(`_playsync/live/${gameCode}/responses/${pushCode}`);
						respRef.on('value', (snap) => {
							let val = snap.val() || {};
							if (val._responded) {
								respRef.off();
								resolve(val);
							}
						});
					}).catch(reject);
				});
			}

		}

		return gamepad;

	}

	const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';

	function getPrettyCode() {
		let time = Date.now();
		let key = `${time}`;
		let sidx = 8;
		let offset = 0;
		let chars = '';
		let nums = key.substr(-4);
		let nidx = parseInt(nums);
		while (offset < 4) {
			let idx = sidx + offset;
			let aidx = parseInt(key[idx]);
			nidx = (nidx + aidx) % ALPHABET.length;
			chars += ALPHABET[nidx];
			offset++;
		}
		let code = `${chars}-${nums}`;
		return code;
	}

	function Platform(inPlatformData) {

		const platformData = inPlatformData;
		let gameCode;
		let FirebaseApp;
		let db;

		const platform = {

			setFirebase: (config) => {
				FirebaseApp = firebase.initializeApp(config, `Gamepad ${Date.now()}`);
				db = FirebaseApp.database();
			},

			getCode: () => {
				return new Promise((resolve, reject) => {
					let codeStr = localStorage.getItem('playsync_code');
					if (codeStr) {
						gameCode = codeStr;
					} else {
						gameCode = getPrettyCode();
						localStorage.setItem('playsync_code', gameCode);
					}
					if (db) {
						db.ref(`_playsync/live/${gameCode}/platform`).set(platformData).then((done) => {
							resolve(gameCode);
						}).catch(reject);
					} else {
						reject('Firebase connection not initialized.');
					}
				});
			},

			when: (eventName, callback) => {
				let feedRef = db.ref(`_playsync/live/${gameCode}/feed`);
				feedRef.on('child_added', (snap) => {
					let val = snap.val() || {};
					// Known issue: server timestamp may not match client timestamp
					let recent = val.timestamp >= CAME_ALIVE;
					if (recent && val.type === 'internal' && val.name === eventName) {
						switch (eventName) {
							case 'gamepadJoined':
								callback(val.gamepad, val.user);
								break;
						}
					}
				});
			},

			on: (eventName, callback) => {
				let feedRef = db.ref(`_playsync/live/${gameCode}/feed`);
				feedRef.on('child_added', (snap) => {
					let val = snap.val() || {};
					// Known issue: server timestamp may not match client timestamp
					let recent = val.timestamp >= CAME_ALIVE;
					if (recent && val.type === 'gamepad' && val.name === eventName) {
						let allData = {
							event: val.event,
							gamepad: val.gamepad,
							user: val.user
						};
						let respondFn = (response) => {
							response._responded = true;
							let pushCode = snap.key;
							let respRef = db.ref(`_playsync/live/${gameCode}/responses/${pushCode}`);
							respRef.set(response);
						};
						callback(allData, respondFn);
					}
				});
			}

		};

		return platform;

	}

	const PlaySync = {
		Gamepad: Gamepad,
		Platform: Platform
	};

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = PlaySync;
	} else {
		window.PlaySync = PlaySync;
	}

})();