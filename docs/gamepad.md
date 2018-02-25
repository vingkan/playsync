# Gamepad API

## Introduction

Using the PlaySync Gamepad API, game developers can turn a user's device into any controller they can dream up using modern web technologies. PlaySync provides a simple messaging API to communicate with the game platform.

## Example Usage

```javascript
// Retrieve game code from the user, might come from URL query parameter or from dialog
const GAME_CODE = 'GSXY-6072';
const gamepad = PlaySync.Gamepad({
	type: 'slider'
});

gamepad.setFirebase(FIREBASE_CONFIG);
gamepad.connect(GAME_CODE).then(function(platformData) {
	gamepad.login().then(function(userData) {
    init();
  });
});

// Callback to set up gamepad controller logic after user connects to platform
function init() {
  const el = document.querySelector('#button');
  el.addEventListener('click', function(e) {
    let eventData = {
      value: parseInt(el.value)
    };
    gamepad.emit('eventName', eventData).then(function(response) {
    	console.log(`Value was ${response.confirmed ? 'valid' : 'invalid'}.`);
    }).catch(function(error) {
      console.error(error);
    });
  });
}
```

## Methods

### gamepad.connect(gameCode)
Connects device to game platform by game code. Returns promise containing developer-defined metadata about the platform and game.
- **Param:** `gameCode`, unique ID of platform to connect to
- **Returns:** Promise with platform and game metadata

### gamepad.login(forceLogin)
Prompts the user to log in with Google so that user profile can be shared with the platform.
- **Param:** `forceLogin` (optional), always opens login popup if true
- **Returns:** Promise with user metadata
- In order to build user trust around profile data, it is recommended that the gamepad first connect using the game code and show information about the game before asking users to log in with their Google account.
- Below is an example of the format of the user profile data contained in the promise:

 ```
 {
    userid: 'adg35qehjfkfg2jfmfg7qjd',
    name: 'Scott Lang',
    email: 'slang@gmail.com',
    image: 'https://slang.me/photo.png'
 }
 ```

### gamepad.emit(eventName, eventData)
Sends message to platform with custom data. The promise will contain any developer-defined data sent back by the platform when `respond()` is called in the platform-side event handler.
- **Param:** `eventName`, developer-defined name of event
- **Param:** `eventData`, developer-defined object with event data
- **Returns:** Promise with platform reply
