var gulp = require('gulp'), 
		del = require('del'),
		gutil = require('gulp-util'),
		argv = require('minimist')(process.argv),
		gulpif = require('gulp-if'), 
		prompt = require('gulp-prompt'),
		sourcemaps = require('gulp-sourcemaps'), 
		jshint = require('gulp-jshint'),
		concat = require('gulp-concat'),
		minifyCSS = require('gulp-minify-css'),
		uglify = require('gulp-uglify'), 
		less = require('gulp-less'),
		sass = require('gulp-sass'), 
		rsync = require('gulp-rsync'),
		sftp = require('gulp-sftp'),
		sp = require ('gulp-spsync'),
		plumber = require('gulp-plumber'),
		config = require('./ecobar_config.json');

var environment;
if (argv.staging) {
	env = 'Staging';
} else if (argv.production) {
	env = 'Production';
} else {
	env = 'Development';
}

// Driven by Menu
gulp.task('default', function() {
	//Create console help page
	gutil.log(gutil.colors.bgCyan('####################################################################'));
	gutil.log(gutil.colors.bgCyan('#'), 'Gulp for Ecobar');
	gutil.log(gutil.colors.bgCyan('#'));
	gutil.log(gutil.colors.bgCyan('#'), gutil.colors.cyan('Usage:'), 'gulp <',gutil.colors.red('action'),
			'> <', gutil.colors.red('parameters'), '>');
	gutil.log(gutil.colors.bgCyan('#'), gutil.colors.red('action:'), '( package | sass | css | js | deploy | jshint | devmode )');
	gutil.log(gutil.colors.bgCyan('#'), gutil.colors.red('parameters:'), '( --production | --silent )');
	gutil.log(gutil.colors.bgCyan('#'));
	gutil.log(gutil.colors.bgCyan('#'), gutil.colors.cyan('Example:'), 'gulp package --production');
	gutil.log(gutil.colors.bgCyan('####################################################################'));
	
});

gulp.task('package', ['clean', 'less', 'sass', 'css', 'js', 'copy']);

gulp.task('clean', function() {
	gutil.log(gutil.colors.cyan('Clean'), 'distribution folder ...');
	return del([config.clean.src], {force: true});
});

gulp.task('less', function() {
	gutil.log(gutil.colors.cyan('Compile'), 'LESS to CSS ...');
	return gulp.src(config.less.src)
		.pipe(less())
		.pipe(gulp.dest(config.less.dest));
});

gulp.task('sass', function() {
	gutil.log(gutil.colors.cyan('Compile'), 'SASS to CSS ...');
	return gulp.src(config.sass.src)
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest(config.sass.dest));
});

gulp.task('css', function() {
	gutil.log(gutil.colors.cyan('Concat'), 'CSS ...');
	if (argv.staging)	{
		return gulp.src(config.css.src)
			.pipe(plumber())
			.pipe(concat('styles.min.css'))
			.pipe(gulp.dest(config.css.dest));
	} else if(argv.production) {
		gutil.log(gutil.colors.cyan('Minify'), 'CSS ...');
  		return gulp.src(config.css.src)
  			.pipe(plumber())
  			.pipe(minifyCSS())
  			.pipe(concat('styles.min.css'))
  			.pipe(gulp.dest(config.css.dest));
	} else {
  		return gulp.src(config.css.src)
  			.pipe(plumber())
  			.pipe(concat('styles.min.css'))
  			.pipe(gulp.dest(config.css.dest));
	}
});	

gulp.task('js', function() {
	gutil.log(gutil.colors.cyan('Concat'), 'Javascript ...');
	if (argv.staging)	{
		return gulp.src(config.js.src)
			.pipe(plumber())
			.pipe(concat('scripts.min.js'))
			.pipe(gulp.dest(config.js.dest));
	} else if(argv.production) {
		gutil.log(gutil.colors.cyan('Uglify'), 'Javascript ...');
  		return gulp.src(config.js.src)
  			.pipe(plumber())
  			.pipe(concat('scripts.min.js'))
  			// only uglify if gulp is ran with '--type production'
  			.pipe(uglify())
  			.pipe(gulp.dest(config.js.dest));
	} else {
  		return gulp.src(config.js.src)
  			.pipe(plumber())
				.pipe(concat('scripts.min.js'))
				.pipe(gulp.dest(config.js.dest));
	}
});	

gulp.task('copy', function() {
	gutil.log(gutil.colors.cyan('Copy'), 'the rest of files to distribution package ...');
	return gulp.src(config.copy.src)
			.pipe(plumber())
			.pipe(gulp.dest(config.copy.dest));
});
gulp.task('deploy', function() {
	gutil.log(gutil.colors.cyan('Deploy'), 'distribution package ...');

if(argv.production) {
		//Production
		return gulp.src(config.deploy.src)
		.pipe(plumber())
		.pipe(gulpif(
      argv.production, 
      prompt.confirm({
        message: 'Are you SURE you want to push to the CDN?',
        default: false
      })
	  ))
		.pipe(sftp({
			host : config.deploy.host,
			user : config.deploy.user,
			pass : config.deploy.password,
			remotePath : config.deploy.dest
		}));
	} else {
		gutil.log('Testing SP deployment');
		return gulp.src(config.deploy.src)
		.pipe(plumber())
		.pipe(sp({
			"client_id":"3d271647-2e12-4ae5-9271-04b3aa67dcd3",
      "client_secret":"Zk9ORywN0gaGljrtlxfp+s5vh7ZyWV4dRpOXCLjtl8U=",
      "realm" : "",
      "site" : "https://uatwww.intranet.nga.mil/xdi/dev/siteassets",
      "verbose": "true"
		})).
		pipe(gulp.dest(config.deploy.sp_dest));
  }
});

gulp.task('jshint', function() {
	return gulp.src(config.js.src)
		.pipe(plumber())
  	.pipe(jshint())
  	.pipe(jshint.reporter('jshint-stylish'));
});

var onError = function(err) {
  console.log(err);
}

// Watch task to compile SASS and jshint on save 
gulp.task('watch', function() {
	gulp.watch(config.less.src, [ 'less' ]);
	gulp.watch(config.sass.src, [ 'sass' ]);
	gulp.watch(config.js.src, ['jshint']);
});
