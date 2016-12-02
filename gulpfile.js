var gulp = require('gulp'), 

/*
	browserSync = require('browser-sync').create(),*/
	del = require('del'),
	gutil = require('gulp-util'),
	argv = require('minimist')(process.argv),
	gulpif = require('gulp-if'), 
	prompt = require('gulp-prompt'),
	replace = require('gulp-replace'),
	ext_replace = require('gulp-ext-replace'),
	/*sourcemaps = require('gulp-sourcemaps'), 
	jshint = require('gulp-jshint'),*/
	concat = require('gulp-concat'),
	//minifyCSS = require('gulp-minify-css'),
	cleanCSS = require('gulp-clean-css'),
	htmlreplace = require('gulp-html-replace'),
	uglify = require('gulp-uglify'), 
	/*less = require('gulp-less'),
	sass = require('gulp-sass'), 
	rsync = require('gulp-rsync'),*/
	sftp = require('gulp-sftp'),
	ssh = require('gulp-ssh'),
	/*sp = require ('gulp-spsync'),*/
	plumber = require('gulp-plumber'),
	config = require('./cdn_config.json');

var ssh_config = {
	host:  config.ssh.host,
	port: 22,
	username: config.ssh.user,
	password: config.ssh.password
}
var gulpSSH = new ssh({
	ignoreErrors: false,
	sshConfig: ssh_config
})

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
	gutil.log(gutil.colors.magenta('####################################################################'));
	gutil.log(gutil.colors.magenta('#'), 'Gulp for CDN');
	gutil.log(gutil.colors.magenta('#'));
	gutil.log(gutil.colors.magenta('#'), gutil.colors.cyan('Usage:'), 'gulp ',gutil.colors.red('action'),
			' [', gutil.colors.yellow('parameters'), ']');
	gutil.log(gutil.colors.magenta('#'), gutil.colors.red('action (required):'), ' all | glide ');
	gutil.log(gutil.colors.magenta('#'), gutil.colors.yellow('parameters (optional):'), '[ --production | --staging ]');
	gutil.log(gutil.colors.magenta('#'));
	gutil.log(gutil.colors.magenta('####################################################################'));
	
});

gulp.task('all', ['chmod']);


// 1. Start by prompting when a user specifies an environment
gulp.task('start', function() {
	if (argv.production) {
	  return gulp.src('')
	  .pipe(prompt.confirm({
		  message: 'Before deploying to Production, have you tagged the Master branch?',
	  		  default: false
	  }));

	} else if (argv.staging) {
		return gulp.src('')
		.pipe(prompt.confirm({
			message: 'Before deploying to Staging, have you merged the Dev branch into Master?',
		      default: false
		}));
		
	} else {
	  return;
	}
})

// 2. Clears the build folder, where the packaged deployment will be
gulp.task('clean', ['start'], function() {
	return del([config.clean.src], {force: true});
});

// 3. Change the html in the index.html to the new minified and concatenated files
gulp.task('replace', ['clean'], function() {
	if (argv.staging || argv.production) {
		return gulp.src(config.replace.src)
		.pipe(htmlreplace({
			'css':'app/css/styles.min.css',
			'js':'app/js/scripts.min.js'
		}))
		.pipe(gulp.dest(config.replace.dest));
	} else {
		// copy the file over as is in dev mode
		return gulp.src(config.replace.src)
		.pipe(plumber())
		.pipe(gulp.dest(config.replace.dest));
	}
});
/*
gulp.task('less', function() {
	gutil.log(gutil.colors.cyan('Compile'), 'LESS to CSS ...');
	return gulp.src(config.less.src)
		.pipe(less())
		.pipe(gulp.dest(config.less.dest))
		.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('sass', function() {
	gutil.log(gutil.colors.cyan('Compile'), 'SASS to CSS ...');
	return gulp.src(config.sass.src)
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest(config.sass.dest))
		.pipe(browserSync.reload({
      stream: true
    }));
});
*/

// 4. Copy all files into the build folder (except the js and css folders)
gulp.task('copy', ['replace'], function() {
	if (argv.staging || argv.production)	{
	  return gulp.src(config.copy.src, {base: config.copy.base})
		.pipe(plumber())
		.pipe(gulp.dest(config.copy.dest));
	} else {
		// Copy over as is in dev mode
	  return gulp.src(config.copy.src_dev, {base: config.copy.base})
		.pipe(plumber())
		.pipe(gulp.dest(config.copy.dest));
	}
	  
});

// 5. Concatenate and minify the CSS files
gulp.task('css', ['copy'], function() {
	if (argv.staging || argv.production)	{
		return gulp.src(config.css.src)
			.pipe(plumber())
			.pipe(cleanCSS())
			.pipe(concat('styles.min.css'))
			.pipe(gulp.dest(config.css.dest));
	} else {
		// Do nothing in dev mode.  Files were copied over.
  		return;
	}
});	


// 6. Uglify the JS files that are not already minified (only in the js folder).  
gulp.task('js-uglify', ['css'], function() {
	if (argv.staging || argv.production){
		// Copy over icons file without minifying
		return gulp.src(config.js.uglifysrc)
			.pipe(plumber())
			.pipe(uglify())
			.pipe(gulp.dest(config.js.dest));
	} else {
		// Do nothing in dev mode.  Files were copied over.
  		return;
	}
});	

// 7. Concatenate all JS files in the application 
gulp.task('js-concat', ['js-uglify'], function() {
	if (argv.staging || argv.production)	{
		return gulp.src(config.js.concatsrc)
		.pipe(plumber())
		.pipe(concat('scripts.min.js'))
		.pipe(gulp.dest(config.js.dest));
	} else {
		// Do nothing in dev mode.  Files were copied over.
  		return;
	}
});	

// 8. Clears the extraneous files in the build folder 
gulp.task('buildjs-cleanup', ['js-concat'], function() {
	if (argv.staging || argv.production)	{
		return del(config.js.concat_cleanup, {force: true});
	} else {
		// Do nothing in dev mode.  Files were copied over.
  		return;
	}
});

// 9. Reverts any .tmp.txt files back into PHP files.  This step is necessary for glided files 
// because they were converted to prevent from being blocked by ECDS.
gulp.task('convert-php', ['buildjs-cleanup'], function() {
	return gulp.src(config.glide.replace_src)
  	.pipe(replace('[start-php]', '<?php'))
  	.pipe(replace('[end-php]', '?>'))
  	.pipe(ext_replace('.php', '.tmp.txt'))
  	.pipe(gulp.dest(config.glide.dest));
})

// 10. Copies the newly generated php files from .tmp.txt back into the php folder.  This scenario is useful 
// when you copy the glided .tmp.txt files into the php folder. That way you will not have to manually
// convert them before commiting it back into GiT.
gulp.task('convert-replace', ['convert-php'], function() {
	return gulp.src(config.glide.convert_src)
	.pipe(gulp.dest(config.glide.convert_dest));
})
// 11. Cleanup the temporary php files because renaming in the same folder creates a copy
gulp.task('convert-cleanup', ['convert-replace'], function() {
	return del(config.glide.replace_src, {force: true});
})

// 12. Cleanup the files and folders on the CDN server (app, php, output, index.html)
gulp.task('clear', ['convert-cleanup'], function () {
	var clear_dest;
	if(argv.production) {
		//Production
		clear_dest = 'cd ' + config.ssh.dest;
	} else if(argv.staging) {
		clear_dest = 'cd ' + config.ssh.dest_staging;
	} else {
		clear_dest = 'cd ' + config.ssh.dest_dev;
	}
	
	return gulpSSH
    	.shell([clear_dest, 'rm -rf app', 'rm -rf php', 'rm -rf output', 'rm index.html'])
});


// 13. SFTP the files and folders in the build package to the CDN server
gulp.task('deploy', ['clear'], function () {		
	var dest = config.ssh.dest_dev; //default to Dev Mode

	if(argv.production) {
		//Production
		dest = config.ssh.dest;
	} else if(argv.staging) {
		dest = config.ssh.dest_staging;
	} else {
		dest = config.ssh.dest_dev;
    }

	return gulp.src(config.ssh.src)
	  .pipe(plumber())
	  .pipe(sftp({
		host : config.ssh.host,
		user : config.ssh.user,
		pass : config.ssh.password,
		remotePath : dest
	  }));
  });

// 14. Change permissions of the files and folders on the CDN server
// Currently set to 777 so that the webserver account can write to the output folder
gulp.task('chmod', ['deploy'], function () {
	var chmod_dest;
	if(argv.production) {
		//Production
		chmod_dest = 'cd ' + config.ssh.dest;
	} else if(argv.staging) {
		chmod_dest = 'cd ' + config.ssh.dest_staging;
	} else {
		chmod_dest = 'cd ' + config.ssh.dest_dev;
    }
	
  return gulpSSH
    .shell([chmod_dest, 'chmod -R 775 *', 'chmod -R 777 output'])
});

// Packages for production will also need to be glided through ECDS.  Because
//PHP files are blocked, we need to rename them to .txt files and change the contents.
gulp.task('glide-package',['clean'], function() {
	return gulp.src(config.glide.package_src, {base: config.copy.base})
	.pipe(plumber())
	.pipe(gulp.dest(config.copy.dest));
});
gulp.task('glide-prep',  ['glide-package'], function () {	
  return gulp.src(config.glide.src)
  	.pipe(replace('<?php', '[start-php]'))
  	.pipe(replace('?>', '[end-php]'))
    .pipe(ext_replace('.tmp.txt'))
    .pipe(gulp.dest(config.glide.dest));
});
// Cleanup the php files because they will be blocked
gulp.task('glide', ['glide-prep'], function() {
	return del(config.glide.convert_src, {force: true});
})

// Dev mode
/*
gulp.task('jshint', function() {
	return gulp.src(config.js.hintsrc)
		.pipe(plumber())
  	.pipe(jshint())
  	.pipe(jshint.reporter('jshint-stylish'));
});*/



