'use strict';

/**
 * Standard error object for the Reekoh IoT Platform
 * @param {string} message Error summary or message.
 * @param {string} stack Error stack trace
 * @constructor
 */
function PlatformError(message, stack) {
	this.name = 'PlatformError';
	this.message = message || 'An unexpected error has occurred.';
	this.stack = stack || '';
}

require('util').inherits(PlatformError, Error);

module.exports = PlatformError;