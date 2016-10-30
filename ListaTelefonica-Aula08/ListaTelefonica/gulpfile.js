var gulp = require('gulp');
var jshint = require('gulp-jshint'); //jshint avalia possiveis erros no código JS
var clean = require('gulp-clean'); //limpa o projeto
var concat = require('gulp-concat'); //concatena os codigos
var uglify = require('gulp-uglify');
var es = require('event-stream');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');

var runSequence = require('run-sequence');
var rename = require('gulp-rename');

//se não se colocar a clausula 'return' as tasks serão executadadas de forma sincrona
 
gulp.task('clean', function(){
		return gulp.src('dist/')
		.pipe(clean());

});

gulp.task('jshint', function(){
	//onde eh feita a leitura dos arquivos
		return gulp.src('js/**/*.js') //readable Stream
		.pipe(jshint()) //envio para jshint
		.pipe(jshint.reporter('default')); //renderizo um report
});

gulp.task('uglify', function(){ 
		return es.merge([
			gulp.src(['node_modules/angular/angular.min.js','node_modules/angular-messages/angular-messages.min.js', 'lib/angular/angular-locale_pt-br.js']), //estes precisam entrar no build mas nao precisam uglifycar, pois já estão minificados
			// gulp.src(['js/*.js','js/controllers/*.js']).pipe(concat('scripts.js')).pipe(uglify())
			gulp.src(['js/**/*.js']).pipe(concat('scripts.js'))//.pipe(uglify())
		])		
		.pipe(concat('all.min.js'))
		.pipe(gulp.dest('dist/js'));

});

//minificação da html
gulp.task('htmlmin', function(){ 

	return gulp.src(['*.html','view/*.html'])
	.pipe(htmlmin({collapseWhitespace: true}))	
	.pipe(gulp.dest('dist/view'))

});

//minificação de css
gulp.task('cssmin', function(){

	return gulp.src(['lib/bootstrap/**/*.css', 'css/**/*.css'])
	.pipe(cleanCSS())
	.pipe(concat('styles.min.css'))
	.pipe(gulp.dest('dist/css'));


})

//copia o index para a dist
gulp.task('copy', function(){

	return gulp.src('index-prod.html')
	.pipe(rename('index.html'))
	.pipe(gulp.dest('dist/'));


});

//executa as tasks
gulp.task('default', function(cb){

	return runSequence('clean', ['jshint', 'uglify', 'htmlmin', 'cssmin', 'copy'], cb)

}); 	
