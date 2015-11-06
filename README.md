# Airbrake Exception Handler
[![Build Status](https://travis-ci.org/Reekoh/raygun-exception-handler.svg)](https://travis-ci.org/Reekoh/airbrake-exception-handler)
![Dependencies](https://img.shields.io/david/Reekoh/airbrake-exception-handler.svg)
![Dependencies](https://img.shields.io/david/dev/Reekoh/airbrake-exception-handler.svg)
![Built With](https://img.shields.io/badge/built%20with-gulp-red.svg)
# airbrake-exception-handler
Airbrake Exception Handler Plugin for the Reekoh IoT Platform. Integrates a Reekoh Instance with Airbrake to log exceptions happening in a certain topology.

## Description
This Plugin logs all exceptions thrown in a Reekoh topology to Airbrake.io for easier bug tracking and fixing if required.

## Configuration
To configure this plugin, an Airbrake.io account and project is needed in order to provide the following:

1. Project ID - The Airbrake.io project ID to use
2. Project API Key - The corresponding API Key of the Airbrake.io project

These parameters are then injected to the plugin from the platform.