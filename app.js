'use strict'

const reekoh = require('reekoh')
const _plugin = new reekoh.plugins.ExceptionLogger()
const request = require('request')

let url = null

_plugin.on('exception', (error) => {
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
  }, (error) => {
    if (error) _plugin.logException(error)
  })
  _plugin.log(JSON.stringify({
    title: 'Exception sent to Airbrake',
    data: {message: error.message, stack: error.stack, name: error.name}
  }))
})

_plugin.once('ready', () => {
  url = `https://airbrake.io/api/v3/projects/${_plugin.config.projectId}/notices?key=${_plugin.config.apiKey}`
  _plugin.log('Air Brake Exception Logger has been initialized.')
  _plugin.emit('init')
})

module.exports = _plugin
