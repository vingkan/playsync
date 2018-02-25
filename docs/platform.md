# Platform API

## Introduction

Using the PlaySync Platform API, game developers can listen for and handle complex data messages to create more interactive gameplay. PlaySync provides a simple messaging API to communicate with the devices acting as gamepads.

## Example Usage

```javascript
const platform = PlaySync.Platform({
	name: 'Rocket Launcher'
});

platform.setFirebase(FIREBASE_CONFIG);
platform.getCode().then((gameCode) {
	init();
});

// Callback to set up platform logic after 
function init() {
  
  platform.when('gamepadJoined', function(gamepad, user) {
    console.log(`${user.name} joined with ${gamepad.type}.`);
  });
  
  platform.on('eventName', function(data, respond) {
    // data = {event, user, gamepad}
    console.log(`${data.user.name} emitted ${data.event._name} from ${data.gamepad.type}.`);
    let positive = data.event.value > 0 ? true : false;
    respond({
      confirmed: positive
    });
  });
  
}
```

## Methods

### gamepad.getCode()
Creates a unique ID for this platform which players can use to connect their gamepads.
- **Returns:** Promise with game code

### gamepad.when(eventName, callback)
Sets an event handler for internal PlaySync events, such as when a gamepad first connects to the platform.
- **Param:** `eventName`, built-in event name
- **Param:** `callback`, developer-defined callback function, with the gamepad and user metadata objects as arguments

### gamepad.on(eventName, callback)
Sets an event handler for custom gamepad events, delivering developer-defined data from the controller device to the platform.
- **Param:** `eventName`, developer-defined event name, same as emitted from the gamepad
- **Param:** `callback`, developer-defined callback function, with the event, gamepad, and user metadata objects as arguments
