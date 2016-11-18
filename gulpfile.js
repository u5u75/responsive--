var gulp=require('gulp');
var rev=require('gulp-rev');//通过哈希吗改变文件名称
var revReplace=require('gulp-rev-replace');//改变对它引用文件里该文件的名称
var useref=require('gulp-useref');//通过注释的方式将文件打包
var filter=require('gulp-filter');//筛选文件进行一些操作，在扔回去
var uglify=require('gulp-uglify');//压缩js
var csso=require('gulp-csso');//压缩css

gulp.task('default',function(){
    var jsFilter=filter('**/.js',{restore:true});
    var cssFilter=filter('**/.css',{restore:true});
    var indexHtmlFilter=filter(['**/*','!**/index.html'],{restore:true});


    return gulp.src('src/index.html')
         .pipe(useref())
         .pipe(jsFilter)
         .pipe(uglify())
         .pipe(jsFilter.restore)
         .pipe(cssFilter)
         .pipe(csso())
         .pipe(cssFilter.restore)
         .pipe(indexHtmlFilter)
         .pipe(rev())
         .pipe(indexHtmlFilter.restore)
         .pipe(revReplace())
         .pipe(gulp.dest('dist'))

});
