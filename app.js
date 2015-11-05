'use strict';

var platform = require('./platform'),
    request = require('request'),
	apiKey, projectID;

/*
 * Listen for the error event.
 */
platform.on('error', function (error) {
    request.post({
        url: 'https://airbrake.io/api/v3/projects/'+ projectID +'/notices?key='+apiKey,
        json: true,
        body: {
            notifier: {
                name: 'Airbrake Exception Handler for Reekoh',
                version: '0.1.0',
                url: ''
            },
            errors: [
                {
                    type: error.name,
                    message: error.message,
                    backtrace: [
                        {
                            file: error.stack,
                            line: null,
                            'function': ''
                        }
                    ]
                }
            ]
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
    apiKey = options.api_key;
    projectID = options.project_id;

    platform.log('Airbrake Exception Handler Initialized.');
	platform.notifyReady();
});