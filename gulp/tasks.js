import gulp from 'gulp';
import { deleteAsync } from 'del';
import fileInclude from 'gulp-file-include';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import webpack from 'webpack-stream';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import svgSprite from 'gulp-svg-sprite';
import gulpIf from 'gulp-if';
import { path } from './constants.js';

const { src, dest } = gulp;
const sass = gulpSass(dartSass);

const isBuild = process.argv.includes('--build');

export function server() {
	browserSync.init({
		server: {
			baseDir: path.build.html,
		},
		notify: false,
		port: 3000,
	})
}

export function reset() {
	return deleteAsync(path.clean);
}

export function watch() {
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, css);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.img, img);
}

export function html() {
	return src(path.src.html)
		.pipe(plumber(
			notify.onError({
				title: 'HTML',
				message: 'Error: <%= error.message %>'
			})
		))
		.pipe(fileInclude())
		.pipe(dest(path.build.html))
		.pipe(browserSync.stream());
}

export function css() {
	return src(path.src.scss, { sourcemaps: !isBuild })
		.pipe(plumber(
			notify.onError({
				title: 'SCSS',
				message: 'Error: <%= error.message %>'
			})
		))
		.pipe(sass())
		.pipe(gulpIf(
			isBuild,
			autoprefixer({
				grid: true,
				overrideBrowserslist: ['last 3 versions'],
				cascade: true,
			})
		))
		.pipe(gulpIf(isBuild, cleanCss()))
		.pipe(rename({
			extname: '.min.css',
		}))
		.pipe(dest(path.build.css))
		.pipe(browserSync.stream());
}

export function js() {
	return src(path.src.js, { sourcemaps: !isBuild })
		.pipe(plumber(
			notify.onError({
				title: 'JS',
				message: 'Error: <%= error.message %>'
			})
		))
		.pipe(webpack({
			mode: isBuild ? 'production' : 'development',
			output: {
				filename: 'app.min.js',
			}
		}))
		.pipe(dest(path.build.js))
		.pipe(browserSync.stream());
}

export function img() {
	return src(path.src.img)
		.pipe(plumber(
			notify.onError({
				title: 'IMG',
				message: 'Error: <%= error.message %>'
			})
		))
		.pipe(newer(path.build.img))
		.pipe(gulpIf(
			isBuild,
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3,
			})
		))
		.pipe(dest(path.build.img))
		.pipe(browserSync.stream());
}

export function icSprite() {
	return src(path.src.icons)
		.pipe(plumber(
			notify.onError({
				title: 'ICONS',
				message: 'Error: <%= error.message %>'
			})
		))
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: '../icons.svg'
				}
			}
		}))
		.pipe(dest(path.build.icons));
}
