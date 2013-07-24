# blackberry-build

> Grunt plugin to package web apps using the BlackBerry Web Works SDK.  Includes two tasks, 'bb_package_bar' and 'bb_deploy_bar'.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install blackberry-build --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('blackberry-build');
```

## The "bb_package_bar" task

### Overview
In your project's Gruntfile, add a section named `bb_package_bar` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  bb_package_bar: {
    options: {
    	sdk: 'PATH_TO_YOUR_WEBWORKS_SDK'
    },
    with_password: {
    	options:{
    		keypass: 'MY_KEYPASS',
            flags: '-d'
    	}
		src: 'test/sample',
		dest: 'tmp'
	}
  }
})
```

### Options

#### options.sdk
Type: `String`
Default value: ``

The path to your Web Works SDK

#### options.keypass
Type: `String`
Default value: ``

Your certificate keypass used to sign the bar file

#### options.flags
Type: `String`
Default value: ``

Any additional script flags you'd like to pass, like '-d' to enable remote debugging

### Properties

#### src
Type: `String`
Default value: ``

The project source to package

#### dest
Type: `String`
Default value: ``

The destination directory to output the device/simulator bar files

### Usage Examples

#### Simple package example
Package up the test/sample folder into the tmp directory
```js
grunt.initConfig({
  bb_package_bar: {
    options: {
    	sdk: 'PATH_TO_YOUR_WEBWORKS_SDK'
    },
    sample: {
		src: 'test/sample',
		dest: 'tmp'
	}
  }
})
```

#### Package, Sign, and Add Flags
Package up the test/sample folder into the tmp directory using a keypass for signing and an additional compiler flag
```js
grunt.initConfig({
  bb_package_bar: {
    options: {
    	sdk: 'PATH_TO_YOUR_WEBWORKS_SDK'
    },
    with_password: {
    	options:{
    		keypass: 'MY_KEYPASS',
            flags: '-d'
    	}
		src: 'test/sample',
		dest: 'tmp'
	}
  }
})
```