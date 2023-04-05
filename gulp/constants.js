export const srcPath = 'src';
export const buildPath = 'dist';

export const path = {
	build: {
		html: buildPath,
		css: `${buildPath}/css/`,
		js: `${buildPath}/js/`,
		img: `${buildPath}/img/`,
		icons: `${buildPath}/icons/`,
		fonts: `${buildPath}/fonts/`,
	},
	src: {
		html: `${srcPath}/*.html`,
		scss: `${srcPath}/scss/index.scss`,
		js: `${srcPath}/js/index.js`,
		img: `${srcPath}/img/**/*.{jpg,jpeg,png,svg,gif,webp}`,
		icons: `${srcPath}/icons/*.svg`,
		fonts: `${srcPath}/fonts/**/*.{eot,woff,woff2,ttf,svg}`,
	},
	watch: {
		html: `${srcPath}/**/*.html`,
		scss: `${srcPath}/scss/**/*.scss`,
		js: `${srcPath}/js/**/*.js`,
		img: `${srcPath}/img/**/*.{jpg,jpeg,png,svg,gif,webp}`,
		fonts: `${srcPath}/fonts/**/*.{eot,woff,woff2,ttf,svg}`,
	},
	clean: [`${buildPath}/*/`, `${buildPath}/*`, `!${buildPath}/icons`],
}
