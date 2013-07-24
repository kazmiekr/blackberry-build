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

## The "bb_deploy_bar" task

### Overview
In your project's Gruntfile, add a section named `bb_deploy_bar` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  bb_deploy_bar: {
    options: {
    	sdk: 'PATH_TO_YOUR_WEBWORKS_SDK'
    },
    sample: {
    	options:{
    		password: 'MY_DEVICE_PASSWORD'
    	}
		ip: '172.16.154.128',
        bar: 'tmp/simulator/sample.bar'
	}
  }
})
```

### Options

#### options.sdk
Type: `String`
Default value: ``

The path to your Web Works SDK

#### options.password
Type: `String`
Default value: ``

Your device password which you are deploying to

### Properties

#### ip
Type: `String`
Default value: ``

The IP address of the device or the simulator you'd like to deploy the bar file to

#### bar
Type: `String`
Default value: ``

The bar file package you want to deploy

### Usage Examples

#### Simulator Deploy Example
Deploy the simulator built bar file to the ip address supplied by your simulator
```js
grunt.initConfig({
  bb_deploy_bar: {
	options: {
		sdk: 'PATH_TO_YOUR_WEBWORKS_SDK'
	},
	to_simulator: {
		ip: '172.16.154.128',
		bar: 'tmp/simulator/sample.bar'
	}
  }
})
```

#### Device Deploy Example
Deploy the device built bar file to the ip address of your device using your device password
```js
grunt.initConfig({
  bb_deploy_bar: {
		options: {
			sdk: 'PATH_TO_YOUR_WEBWORKS_SDK'
		},
		to_device: {
			options: {
				password: 'MY_DEVICE_PASSWORD'
			},
			ip: '169.254.0.1',
			bar: 'tmp/device/sample.bar'
		}
	}
})