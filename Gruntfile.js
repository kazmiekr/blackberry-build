/*
 * blackberry-build
 * https://github.com/kazmiekr/blackberry-build
 *
 * Copyright (c) 2013 Kevin Kazmierczak
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>',
			],
			options: {
				jshintrc: '.jshintrc',
			},
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		// Configuration to be run (and then tested).
		blackberry_build: {
			options: {
				sdk: '/Developer/SDKs/Research In Motion/BlackBerry 10 WebWorks SDK 1.0.4.11'
			},
			package_bar: {
				src: '/Users/kevin/Desktop/Blackberry/WebMadBombz/public/',
				dest: '/Users/kevin/Desktop/Blackberry/dist',
				keypass: 'bbdna0',
				extras: '-d -v'
			},
			deploy_bar: {
				ip: '172.16.154.128',
				bar: '/Users/kevin/Desktop/Blackberry/dist/device/public.bar'
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js'],
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'blackberry_build', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
