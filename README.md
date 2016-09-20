# grunt-wordpress-git-hash-versioning

> Adds the current commit hash to the version of a WordPress theme CSS file or a plugin file. Useful for keeping track of which version is on which environment while we are still in development.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-wordpress-auto-versioning --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-wordpress-git-hash-versioning');
```

## The "wordpress_git_hash_versioning" task

### Overview
In your project's Gruntfile, add a section named `wordpress_git_hash_versioning` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  wordpress_git_hash_versioning: {
    options: {},
    your_target: {
			files: 'destination-file' : 'source-file'
    },
  },
});
```

This will work for anything with the word "Version: #" up at the top of the document in a comment. We just replace the first instance of it, so if you are running it on a plugin or theme file that has this pattern in it you shouldn't run into any problems. Just don't run it on everything on your theme or you might end up with an unexpected false positive somewhere.

### Options

gitDirectory: null,
shortHash: true,

#### options.gitDirectory
Type: `String`
Default value: null

A string value to the path of the directory you want to use for finding the current git commit. If this isn't set the current directory is used. This exists mostly for testing purposes.

#### options.shortHash
Type: `boolean`
Default value: `true`

By default we get the short hash of the current commit to append to the version. If you set this to false the full sha hash will be used.

### Usage Examples

Most of the time we just need to just use the default values to append the shortened hash in a single file. If we are using a CSS pre-processor or post-processor make sure that we update the version before processing so we don't mess up the source maps

```js
grunt.initConfig({
  wordpress_git_hash_versioning: {
		dist: {
			files: {
				'_assets/sass/style.scss': '_assets/sass/style.scss'
			},
		}
	}
});
```

We can do the same thing with the main file in a plugin.

```js
grunt.initConfig({
  wordpress_git_hash_versioning: {
		dist: {
			files: {
				'myplugin.php': 'myplugin.php'
			},
		}
	}
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

### Unit Tests

It is worth mentioning that the grunt plugin uses unit tests to ensure that the output code works properly. The tests have to work around the fact that we can't include a git repository in this codebase, and every time we commit something the commit hash will change. We don't want to have to change the expected output every time we commit something.

To work around this there is a method in the gruntfile that makes a copy of the git database and uses that instead of the main one. This is the main reason that I have allowed users to tweak the working directory that we are looking at the git commits, though possibly that could be useful to someone. When adding functionality keep in mind that we are testing with this copied git repository rather than any repository actually hooked up with code.

### Reinventing the Wheel

This is a bit of a very specific thing that our team does to keep track of wordpress themes and plugins. You could probably accomplish the same sort of things using the following existing tools, but probably not all at once like we are here.

- [git-rev](https://github.com/tblobaum/git-rev)
- [grunt-text-replace](https://github.com/yoniholmes/grunt-text-replace)

### Platforms Supported

Currently because I am calling git straight from the command line, this likely will only work on Posix systems. We can likely get around this if necessary by using this instead:

- [node-git](https://github.com/nodegit/nodegit)

Though if you are that determined it may be better worth your time to use node-git to improve the git-rev library mentioned above.

## Release History
