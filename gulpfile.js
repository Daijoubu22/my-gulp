import gulp from 'gulp';
import {
	css,
	html,
	js,
	img,
	icSprite,
	reset,
	server,
	watch,
} from './gulp/tasks.js';

const mainTasks = gulp.parallel(html, css, js, img);
const dev = gulp.series(reset, mainTasks, gulp.parallel(watch, server));
const build = gulp.series(reset, icSprite, mainTasks);

export { build };
export { icSprite };

gulp.task('default', dev);
