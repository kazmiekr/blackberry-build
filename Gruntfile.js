/*
 * blackberry-build
 * https://github.com/kazmiekr/blackberry-build
 *
 * Copyright (c) 2013 Kevin Kazmierczak
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	var bbsdk = '/Developer/SDKs/Research In Motion/BlackBerry 10 WebWorks SDK 1.0.4.11';

	grunt.initConfig({

		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		bb_package_bar: {
			options:{
				sdk: bbsdk
			},
			with_password: {
				options:{
					keypass: 'MY_KEYPASS',
					flags: '-d'
				},
				src: 'test/sample',
				dest: 'tmp'
			}
		},

		bb_deploy_bar: {
			options: {
				sdk: bbsdk
			},
			to_simulator: {
				ip: '172.16.154.128',
				bar: 'tmp/simulator/sample.bar'
			},
			to_device: {
				options: {
					password: 'MY_DEVICE_PASSWORD'
				},
				ip: '169.254.0.1',
				bar: 'tmp/device/sample.bar'
			}
		},

		clean: {
			tests: ['tmp']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('bbtest', ['clean', 'bb_package_bar', 'bb_deploy_bar']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'bbtest']);

};
