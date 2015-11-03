'use strict';

var platform = require('./platform'),
	airbrake;

/*
 * Listen for the error event.
 */
platform.on('error', function (error) {
    airbrake.notify(error, function(err, url) {
        if (!err) return;

        console.error('Error on Airbrake.', err);
        platform.handleException(err);
    });
});

/*
 * Event to listen to in order to gracefully release all resources bound to this service.
 */
platform.on('close', function () {
	platform.notifyClose();
});

/*
 * Listen for the ready event.
 */
platform.once('ready', function (options) {
    airbrake = require('airbrake').createClient(options.api_key);

    platform.log('Airbrake Exception Handler Initialized.');
	platform.notifyReady();
});