'use strict';

var platform = require('./platform'),
	request  = require('request'),
	url;

/*
 * Listen for the error event.
 */
platform.on('error', function (error) {
	request.post({
		url: url,
		json: true,
		body: {
			notifier: {
				name: 'Airbrake Exception Handler for Reekoh',
				version: '1.0.0',
				url: 'http://reekoh.com'
			},
			errors: [{
				type: error.name,
				message: error.message,
				backtrace: [{
					file: error.stack,
					'function': ''
				}]
			}]
		}
	}, function (error) {
		if (error) platform.handleException(error);
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
	url = `https://airbrake.io/api/v3/projects/${options.project_id}/notices?key=${options.api_key}`;

	platform.log('Airbrake Exception Handler Initialized.');
	platform.notifyReady();
});