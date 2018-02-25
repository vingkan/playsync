# PlaySync
===========

##Description:
	 PlaySyncJS is an open source, client side Javascript library that allows users to use their smartphones as game controllers for video games on the web. PlaySyncJS offers a simple API for developers create  various controllers as well to integrate the controllers into games using only HTML, CSS and JavaScript.

#Users
##Installation & Requirements:
		No installation required. Since the platform is completley web based

##SetUp & Configuration:
	Using your computer, Go to https//www.PlaySyncjs.com/platform and generate a GameCode#
	Then using your smart phone, go to https//www.PlaySyncjs.com/gamepad and enter the room # in the prompt. 
	lastly, log in with google to select your controller and play!

#Developers

##Installation:
		download playsync.js file and include it in script tags in your html page

##Usage & Documentation:
	

	# Connection API: Gamepad

// Retrieve game code from the user, might come from URL query parameter or from dialog
const GAME_CODE = 'GSX-672'; // specified to prevent user from joining or overwriting someone elses game
const gamepad = PlaySync.Gamepad({
	type: 'slider'
});
// uses factory function to create gamepad

gamepad.setFirebase(FIREBASE_CONFIG);// enter your firebase config here.
gamepad.connect(GAME_CODE).then(function(platformData) { 
	gamepad.login().then(function(userData) {
    init();
  });
});
// connects and sets up firebase real time database
// logs in using google account for identification and uid tracking


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
// in your init function add event listeners to all input buttons of controller. The event listener should emit an event from the gamepad to the platform

# Connection API: Platform

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





Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

##Benefits:
		- Cross-Platform. Use Android/iOS smart phones as controllers to play on MAC/PC

		- Change the way you play. Gone are the days of sharing a keyboard to play a local multiplayer game

		- Power to customize. Customize any controller that you could dream up in HTML,CSS and JavaScript

		- Use your smart phone. No need for adapters or any additional hardware

		- Choose from a library of preset controllers or make your own!

##Contributers:
		There are many ways to contribute to this project and contibuters a more than welcome.
		The community can contribute by:
		- Creating and sharing  fun and useful controller layouts
		- Integrating PlaySync with popular web based games
		- Reporting bugs in the platform

