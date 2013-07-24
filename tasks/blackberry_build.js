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
		log = grunt.log,
		childProcess,
		script = "",
		cmd = "";

	grunt.registerMultiTask('bb_package_bar', 'Packages up a web project into a bar file', function() {

		var options = this.options(),
			done = this.async(),
			data = this.data;

		if (!options.sdk) {
			log.error('Missing sdk property.');
			return done(false);
		}

		if (data.src === undefined || data.dest === undefined) {
			log.error('Source and Destination properties are required');
			return done(false);
		}
		script = "bbwp";
		cmd = "\"" + options.sdk + "/" + script + "\" " + data.src + " -o " + data.dest;
		if (options.keypass) {
			cmd += " -g " + options.keypass;
		}
		if (options.flags) {
			cmd += " " + options.flags;
		}

		if (data.simulate){
			log.writeln(cmd);
			done();
		} else {
			runScript(cmd, done);
		}

	});

	grunt.registerMultiTask('bb_deploy_bar', 'Deploys a bar file to the device or simulator', function() {

		var options = this.options(),
			done = this.async(),
			data = this.data;

		if (!options.sdk) {
			log.error('Missing sdk property.');
			return done(false);
		}

		if (data.ip === undefined || data.bar === undefined) {
			log.error('IP Address and Bar file are required ');
			return done(false);
		}
		script = "dependencies/tools/bin/blackberry-deploy";
		cmd = "\"" + options.sdk + "/" + script + "\" -installApp -device " + data.ip + " -package " + data.bar;
		if (options.password) {
			cmd += " -password " + options.password;
		}

		if (data.simulate){
			log.writeln(cmd);
			done();
		} else {
			runScript(cmd, done);
		}
	});

	var runScript = function(script, done) {
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
	};

};
