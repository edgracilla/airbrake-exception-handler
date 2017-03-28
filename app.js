'use strict'

const reekoh = require('reekoh')
const plugin = new reekoh.plugins.ExceptionLogger()
const request = require('request')

let url = null

plugin.on('exception', (error) => {
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
    if (error) plugin.logException(error)
  })
  plugin.log(JSON.stringify({
    title: 'Exception sent to Airbrake',
    data: {message: error.message, stack: error.stack, name: error.name}
  }))
})

plugin.once('ready', () => {
  url = `https://airbrake.io/api/v3/projects/${plugin.config.projectId}/notices?key=${plugin.config.apiKey}`
  plugin.log('Air Brake Exception Logger has been initialized.')
  plugin.emit('init')
})

module.exports = plugin
