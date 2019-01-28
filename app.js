var express = require('express');
var app = express();
var multer = require('multer');  // 파일 업로드를 위한 multer 모듈 설치
var upload = multer({dest : '../uploads/'})
var bodyparser = require('body-parser');  // post하기 위해 필요한 미들웨어
app.set('view engine', 'pug'); //pug 엔진 템플릿 불러오기
app.set('views', './views');  // 뷰파일 불러오기 (pug,html)
app.locals.pretty = true;   // html 이쁘게
app.use(express.static('public'));  
 //[정적인 파일 디렉토리 설정] 이미지, 텍스트파일을 넣을수 있음

app.use(bodyparser.urlencoded({extended:false}));  // bodyparser 에 필요한 코드

app.get('/', function(req, res) {
    res.send('Hello');
});

app.get('/dynamic', function(req, res){
    var time = Date();
    var lis = '';
    for(var i = 0; i<5; i++)
        lis = lis + '<li>coding</li>';
    var output = `
    <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>TEST페이지</title>
        
            </head>
            <body>
                Hello, Static !!!!! 2222
                <ul>
                ${lis}
                </ul>
                ${time}
            </body>
        </html> `;
    res.send(output);
    // 동적 인 HTML
});

app.get('/route', function(req, res){
    res.send('Hello Router, <img src="/route.gif">');
});

app.get('/login', function(req, res){
    res.send('<h1>Login<h1>')
});

app.listen(3000, function() {
    console.log("연결됨 3000 포트");
});   //포트 정하기

app.get('/topic2',function(req, res) {
     res.send(req.query.id+', '+req.query.name);
 }); 
 // http://localhost:3000/topic?id=20&name=test  id와 name의 값을 req로 받는다.
 
app.get('/topic',function(req, res) {  
    var topics = ['Java', 'Node', 'Express'];
    var output = `
    <a href="/topic?id=0">Java</a><br>  
    <a href="/topic?id=1">Node</a><br>
    <a href="/topic?id=2">Express</a><br><br>
    ${topics[req.query.id]}
    `
    res.send(output);
});   // 홈페이지 제작(임시)

app.get('/topic/:id',function(req, res) {  
    var topics = ['Java', 'Node', 'Express'];
    var output = `
    <a href="/topic/0">Java</a><br>
    <a href="/topic/1">Node</a><br>
    <a href="/topic/2">Express</a><br><br>
    ${topics[req.params.id]}
    `
    res.send(output);
});    // 파라미터 방식
/* 
주소 뒤 /:id 를 할 경우
http://localhost:3000/topic/[아무숫자]
아무 숫자를 넣어도 인식한다 ex) 1, 1000, 21321 ....
parms 는 /id 가 인식되게 만들어준다. (id내의 값이 있을 경우)
*/

app.get('/topicid/:id/:mode', function(req, res){
    res.send(req.params.id+', '+req.params.mode);
});
// 주소가 다중일 경우  http://localhost:3000/topicid/1/edit

app.get('/form', function(req, res) {
   res.render('form'); 
});  //pug 불러오는 방법  

app.get('/form_receiver', function(req, res){
    var title = req.query.title;               // 값 선언 
    var description = req.query.description;

    res.send(`결과값: ${title}, ${description}`);
});    // 넣은 결과를 보여주는 페이지  (query를 사용해 변수값을 불러옴)


app.post('/form_receiver', function(req, res){
    var title = req.body.title;               // 값 선언 
    var description = req.body.description;
    res.send(title +', ' + description);
});  // body를 사용해 변수값을 불러옴
/*
get 방식은 주소(url)에 결과값이 남음
post 방식은 주소(url)에 안남음  (전송 데이터가 많을때)
(보안성은 차이가 없음) = https 를 사용해야함
*/


app.get('/uploadform', function(req, res){
 
    res.render('upload');
});

app.post('/upload', upload.single('userfile'), function(req, res){
    res.send('das '+req.file.filename);
       console.log(req.file);
});

// 지울 내용 ------------------------------
app.get('/ttt',function(req, res){
    var t = `
    <html>
    <head>
    <meta chaset = 'utf-8'>
    </head>
    <body>
    <form action='/ptt'>
    <input type="text", name='tes'>
    </form>
    </body>
    </html>
    `
   res.send(t);
});

app.get('/ptt',function(req, res){
   res.send("test다 " +req.query.tes);
});

app.get('/ttt2',function(req, res){
    var t = `
    <html>
    <head>
    <meta chaset = 'utf-8'>
    </head>
    <body>
    <form action='/ptt2' method = 'post' >
    <input type="text", name='tes'>
    </form>
    </body>
    </html>
    `
   res.send(t);
});

app.post('/ptt2',function(req, res){
   res.send("test다 " +req.body.tes);
});


app.get('/topic/id', function(req, res) {
    var topics = [
        'javascript is...',
        'nodejs is...',
        'Express is...'
    ];

    var output =`
    <a href="/topic/0">JavaScript</a><br>
    <a href="/topic/0">Nodejs</a><br>
    <a href="/topic/0">Express</a><br><br>
    ${topics[req.params.id]}
    `
    res.send(output);
    
});


app.get('/topicids/:id:mode',function(req,res){
    res.send(req,params.id+', '+req.params.mode)
});