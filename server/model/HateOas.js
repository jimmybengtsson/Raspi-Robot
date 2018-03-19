'use strict';

let uri = 'http://109.228.145.167:8000/';

// HATEOAS Info

let hateOasObj = {
    model: { rel: 'model', method: 'GET', title: 'Get info about API', href: '/model' },
    actionLedOn: { rel: 'actions.ledOn', method: 'GET', title: 'Turn on leds', required: 'JSON-object with userName & password has to be included in body', href: '/actions/led/on' },
    actionLedOff: { rel: 'actions.ledOff', method: 'GET', title: 'Turn off leds', required: 'JSON-object with userName & password has to be included in body', href: '/actions/led/off' },
    actionLedBlink: { rel: 'actions.ledBlink', method: 'GET', title: 'Flash leds for 5 seconds', required: 'JSON-object with userName & password has to be included in body', href: '/actions/led/blink' },
    actionHueOn: { rel: 'actions.hueOn', method: 'GET', title: 'Turn on hue-light', required: 'JSON-object with userName & password has to be included in body', href: '/actions/hue/on' },
    actionHueOff: { rel: 'actions.hueOff', method: 'GET', title: 'Turn off hue-light', required: 'JSON-object with userName & password has to be included in body', href: '/actions/hue/off' },
    actionHueBlink: { rel: 'actions.hueBlink', method: 'GET', title: 'Flash hue-light for 5 seconds', required: 'JSON-object with userName & password has to be included in body', href: '/actions/hue/blink' },
    actionCameraLeft: { rel: 'actions.cameraLeft', method: 'GET', title: 'Rotate camera servo to the left', required: 'JSON-object with userName & password has to be included in body', href: '/actions/camera/left' },
    actionCameraRight: { rel: 'actions.cameraRight', method: 'GET', title: 'Rotate camera servo to the right', required: 'JSON-object with userName & password has to be included in body', href: '/actions/camera/right' },
    actionCameraCenter: { rel: 'actions.cameraCenter', method: 'GET', title: 'Center camera servo', required: 'JSON-object with userName & password has to be included in body', href: '/actions/camera/center' },
    actionMotorForward: { rel: 'actions.motorForward', method: 'GET', title: 'Run the motors forward', required: 'JSON-object with userName & password has to be included in body', href: '/actions/motor/forward' },
    actionMotorReverse: { rel: 'actions.motorRevers', method: 'GET', title: 'Run the motors in reverse', required: 'JSON-object with userName & password has to be included in body', href: '/actions/motor/reverse' },
    actionMotorStop: { rel: 'actions.motorStop', method: 'GET', title: 'Stop the motors', required: 'JSON-object with userName & password has to be included in body', href: '/actions/motor/stop' },
    actionMotorLeft: { rel: 'actions.motorLeft', method: 'GET', title: 'Run the motors to the left', required: 'JSON-object with userName & password has to be included in body', href: '/actions/motor/left' },
    actionMotorRight: { rel: 'actions.motorRight', method: 'GET', title: 'Run the motors to the right', required: 'JSON-object with userName & password has to be included in body', href: '/actions/motor/right' },
    propertiesTemperatureLatest: { rel: 'properties.temperatureLatest', method: 'GET', title: 'Get latest temperature', required: 'JSON-object with userName & password has to be included in body', href: '/properties/temperature/latest' },
    propertiesHumidityLatest: { rel: 'properties.humidityLatest', method: 'GET', title: 'Get latest humidity', required: 'JSON-object with userName & password has to be included in body', href: '/properties/humidity/latest'},
    propertiesSensorAll: { rel: 'properties.sensorAll', method: 'GET', title: 'Get all values from the dht-sensor', required: 'JSON-object with userName & password has to be included in body', href: '/properties/sensor/all'},
    propertiesHueLatest: { rel: 'properties.hueLatest', method: 'GET', title: 'Get latest hue', required: 'JSON-object with userName & password has to be included in body', href: '/properties/hue/latest'},
    propertiesHueAll: { rel: 'properties.hueAll', method: 'GET', title: 'Get all values from the hue-sensors', required: 'JSON-object with userName & password has to be included in body', href: '/properties/hue/all'},
    propertiesHueState: { rel: 'properties.hueState', method: 'GET', title: 'Get state of hue-light', required: 'JSON-object with userName & password has to be included in body', href: '/properties/hue/state'},
    getUser: { rel: 'user.get', method: 'GET', title: 'Get users info', required: 'x-access-token has to be included in header', href: '/user' },
    deleteUser: { rel: 'user.delete', method: 'DELETE', title: 'Delete user', required: 'x-access-token has to be included in header', href: '/user' },
    updateUser: { rel: 'user.update', method: 'PUT', title: 'Update user', required: 'x-access-token has to be included in header', href: '/user'},
    registerUser: { rel: 'user.create', method: 'POST', title: 'Register a new user', required: 'JSON-object with userName & password has to be included in body', href: '/register' },
    loginUser: { rel: 'user.login', method: 'POST', title: 'Login a user', required: 'JSON-object with userName & password has to be included in body', href: '/login' },
    thingsCamera: { rel: 'things.camera', method: 'WS', title: 'Connect to websocket when a user visits the site to start the FFMPEG-processing. When user leaves, the processing stops.', href: '/'},

  };

// Generate HATEOAS-links for response

exports.getHateOasLinks = (data, category, self) => {

    return new Promise((resolve, reject) => {

        let linkArray = [];

        for (let key in hateOasObj) {

          if (hateOasObj.hasOwnProperty(key)) {

            if (key.toLowerCase().indexOf(category.toLowerCase()) >= 0 && key !== self) {

              linkArray.push(hateOasObj[key]);
            }

            if (key === self) {

              hateOasObj[key].rel = 'self';
              linkArray.unshift(hateOasObj[key]);
            }
          }
        }

        let response = {
            data: data,
            links: linkArray,
          };

        resolve(response);

        reject((err) => {
            throw new Error(err);
          });

      });
  };

module.exports.hateOasObj = hateOasObj;
