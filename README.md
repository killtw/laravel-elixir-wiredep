#Laravel-Elixir-Wiredep

> This Laravel Elixir extension allows you using [wiredep](https://github.com/taptapship/wiredep).

# Getting Started
First, install the module through [npm](https://npmjs.org):

```bash
$ npm install --save @killtw/laravel-elixir-wiredep
```

Next, add some config to your gulpfile.

```js
var elixir = require('laravel-elixir');
require('@killtw/laravel-elixir-wiredep');

elixir(function(mix) {
   mix..wiredep();
});
```

Then install your dependencies:

```bash
$ bower install jquery --save
```

Inset placeholders in your files:

```html
<html>
  <head>
    <!-- bower:css -->
    <!-- endbower -->
  </head>
  <body>
    <!-- bower:js -->
    <!-- endbower -->
  </body>
</html>
```

That's it! You're all set to go!<br>This will scan your Bower dependencies on `bower.json` and inject them in your files.

# Note
Wiredep will import your dependencies directly, so make sure your bower dependencies will install in public folder.<br>Just create a `.bowerrc` file in the root of your project, like:

```json
{
  "directory" : "public/bower_components"
}
```

# Options

```js
mix.wiredep({
    baseDir: 'resources/',
    src: ['**/*.php', '/**/*.+(sass|scss)', '**/*.less']
}, options);
```
*Note: options accepts all [wiredep options](https://github.com/taptapship/wiredep#configuration).

* `baseDir` - the folder for your files
* `src` - files for search
