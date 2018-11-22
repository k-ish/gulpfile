const path = require("path");   // パス取得（標準モジュール）
const fs = require("fs-extra");   // ファイル操作（標準モジュール拡張）
const gulp = require("gulp");
const sass = require("gulp-sass");
const gcmq = require("gulp-group-css-media-queries");
const pug = require("gulp-pug");
const plumber = require("gulp-plumber");    // errorでも監視継続
const rename = require("gulp-rename");

// gulp.task(“タスク名”,function() {});でタスクの登録をおこないます。
// gulp.src(“MiniMatchパターン”)で読み出したいファイルを指定します。
// pipe(行いたい処理)でsrcで取得したファイルに処理を施します
// gulp.dest(“出力先”)で出力先に処理を施したファイルを出力します。

// “sass/style.scss” sass/style.scssだけヒット
// “sass/*.scss” sassディレクトリ直下にあるscssがヒット
// “sass/**/*.scss” sassディレクトリ以下にあるすべてのscssがヒット
// [“sass/**/.scss”,"!sass/sample/**/*.scss] sass/sample以下にあるscssを除くsassディレクトリ以下のscssがヒット


var basedir = "./dest/";   // ルートディレクトリを指定
var dir = basedir;


// sassコンパイル
gulp.task("sass", function () {
    gulp.src("./source/**/*.scss")
        .pipe(sass({ outputStyle: "expanded" })) // sassコンパイル
        .on("error", sass.logError) // 監視中のエラーによる強制停止を回避
        .pipe(gcmq()) //メディクエリをマージ
        .pipe(gulp.dest(dir)); //同階層にcssを書出し
});


// pug コンパイル
gulp.task("pug", function () {
    gulp.src(["./source/**/*.pug", "!source/**/_*.pug"])
        .pipe(plumber()) // 監視中のエラーによる強制停止を回避
        .pipe(
            pug({
                pretty: true
            })
        )
        .pipe(gulp.dest(dir));
});


// html コピー
gulp.task("html", function() {
    gulp.src(["./source/**/*.html", "!./source/_copythis/**/*", "!./source/_partial/**/*"])
        .pipe(gulp.dest(dir));
});


// css コピー
gulp.task("css", function() {
    gulp.src(["./source/**/*.css", "!./source/_copythis/**/*", "!./source/_partial/**/*"])
        .pipe(gulp.dest(dir));
});


// 監視
gulp.task("default", function () {
    gulp.watch(["./source/**/*.pug", "!source/**/_*.pug"], ["pug"]);
    gulp.watch("./source/**/*.scss", ["sass"]);
    gulp.watch("./source/**/*.html", ["html"]);
    gulp.watch("./source/**/*.css", ["css"]);
});


// 初回実行
gulp.task("build", ['sass', 'pug', 'html', 'css']);




// ファイルコピー
// ゼロパディング関数
function zeroPadding(num, length) {
    return ('0000000000' + num).slice(-length);
}
gulp.task("copy2", function () {
    for (i = 1; i <= 20; i++) {     // 条件に生成する回数
        var copyNum = zeroPadding(i, 2);    // ゼロパディングの右値が桁、左値が実際の数
        gulp.src("index.html")      // コピー元
            .pipe(rename({
                dirname: "test2",   // ディレクトリ構造
                basename: "index",  // 基本名
                prefix: "a-",       // 先頭文字
                suffix: copyNum,    // 後尾文字
                extname: ".css"     // 拡張子
            }))
            .pipe(gulp.dest('./dist'));
    }
});


gulp.task("cop", function () {
    for (i = 1; i <= 5; i++) {     // 条件に生成する回数
        var copyNum = zeroPadding(i, 2);    // ゼロパディングの右値が桁、左値が実際の数
        gulp.src("index.pug")      // コピー元
            .pipe(rename({
                dirname: "",   // ディレクトリ構造
                basename: "index",  // 基本名
                prefix: "a-",       // 先頭文字
                suffix: copyNum,    // 後尾文字
                extname: ".css"     // 拡張子
            }))
            .pipe(gulp.dest('./dist'));
    }

    fs.readdir('./dist', function (err, files) {});
        for(var file in files) {
            var name = path.basename(file);
            fs.appendFile('file', 'name', function (err) {});
        }

});

gulp.task("fs", function () {
    // fs.apendFile('./index.pug', 'test', function (err) { })


    var files = fs.readdirSync('./dist');
        for (file in files){
            var name = path.basename(file);
            var place = "./dist";
            fs.appendFileSync(place + file, name);
        }


});

gulp.task("t", function(){
    fs.mkdirSync("./test");
    for (i = 0; i <= 3; i++) {
        fs.copyFileSync("index.pug", "./test/" + "index" + i  + ".html");
        fs.copyFile()
    }
});


gulp.task("delete", function () {
    fs.unlink("./dist/a-index05.css", function (err) { })
});

gulp.task("path", function () {
    var str = "./dist/a-index01.css";
    var result = path.extname(str);
    fs.appendFile('./index.pug', result, function (err) { })

});
