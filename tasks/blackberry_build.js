/*
 * blackberry-build
 * https://github.com/kazmiekr/blackberry-build
 *
 * Copyright (c) 2013 Kevin Kazmierczak
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	var cp = require('child_process'),
		log = grunt.log;

	grunt.registerMultiTask('blackberry_build', 'Your task description goes here.', function() {

		var data = this.data,
			childProcess,
			done = this.async(),
			script = "",
			cmd = "";

		var options = this.options();

		if (!options.sdk) {
			log.error('Missing sdk property.');
			return done(false);
		}

		if (this.target === "package_bar") {
			if (data.src === undefined || data.dest === undefined) {
				log.error('Source and Destination properties are required');
				return done(false);
			}
			script = "bbwp";
			cmd = "\"" + options.sdk + "/" + script + "\" " + data.src + " -o " + data.dest;
			if (data.keypass) {
				cmd += " -g " + data.keypass;
			}
			if (data.extras) {
				cmd += " " + data.extras;
			}
		} else if (this.target === "deploy_bar") {
			if (data.ip === undefined || data.bar === undefined) {
				log.error('IP Address and Bar file are required ');
				return done(false);
			}
			script = "dependencies/tools/bin/blackberry-deploy";
			cmd = "\"" + options.sdk + "/" + script + "\" -installApp -device " + data.ip + " -package " + data.bar;
			if (data.password) {
				cmd += " -password " + data.password;
			}
		}

		grunt.log.writeln("Running script: " + cmd);
		childProcess = cp.exec(cmd, {}, function() {
		});

		childProcess.stdout.on('data', function(d) {
			log.write(d);
		});
		childProcess.stderr.on('data', function(d) {
			log.error(d);
		});

		childProcess.on('exit', function(code) {
			if (code !== 0) {
				log.error('Exited with code: %d.', code);
				return done(false);
			}

			done();
		});
	});

};
