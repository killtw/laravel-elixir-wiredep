var Elixir = require('laravel-elixir'),
    gulp = require('gulp'),
    wiredep = require('wiredep').stream,
    _ = require('underscore');

Elixir.extend('wiredep', function(config, options) {
    var defaultOptions = {
        bowerPath: './bower.json',
        ignorePath: /(\..\/)*public/,
        fileTypes: {
            php: {
                block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                detect: {
                    js: /<script.*src=['"]([^'"]+)/gi,
                    css: /<link.*href=['"]([^'"]+)/gi
                },
                replace: {
                    js: '<script src="{{filePath}}"></script>',
                    css: '<link rel="stylesheet" href="{{filePath}}" />'
                }
            }
        }
    },
    defaultConfig = {
        baseDir: 'resources/',
        src: ['**/*.php', '/**/*.+(sass|scss)', '**/*.less']
    };

    options = _.extend(defaultOptions, options);
    config = _.extend(defaultConfig, config);

    new Elixir.Task('wiredep', function() {
        var paths = prepGulpPaths(config.src, config),
            src = paths.src.path;

        return gulp.src(src)
            .pipe(wiredep(options))
            .pipe(gulp.dest(config.baseDir))
            .on('error', onError);
    })
    .watch(options.bowerPath);

    var prepGulpPaths = function(src, config) {
        return new Elixir.GulpPaths()
            .src(src, config.baseDir);
    };

    var onError = function(e) {
        return new Elixir.Notification().error(e, 'Wiredep injection Failed!');
    };
});
