'use strict';

const apiKey = 'e7aa62898bb9404a3485a29aba493068';

var cp     = require('child_process'),
	assert = require('assert'),
	exceptionHandler;

describe('Exception Handler', function () {
	this.slow(5000);

	after('terminate child process', function () {
		exceptionHandler.kill('SIGKILL');
	});

	describe('#spawn', function () {
		it('should spawn a child process', function () {
			assert.ok(exceptionHandler = cp.fork(process.cwd()), 'Child process not spawned.');
		});
	});

	describe('#handShake', function () {
		it('should notify the parent process when ready within 5 seconds', function (done) {
			this.timeout(5000);

			exceptionHandler.on('message', function (message) {
				if (message.type === 'ready')
					done();
			});

			exceptionHandler.send({
				type: 'ready',
				data: {
					options: {
						api_key: apiKey
					}
				}
			}, function (error) {
				assert.ifError(error);
			});
		});
	});

	describe('#error', function (done) {
		it('should process the error data', function () {
			var sampleError = new Error('Airbrake Exception Handler test error.');

			exceptionHandler.send({
				type: 'error',
				data: {
					message: sampleError.message,
					stack: sampleError.stack
				}
			}, done);
		});
	});
});