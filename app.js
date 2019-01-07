 var express = require('express');
 var app = express();
 app.set('view engine', 'pug');
 app.set('views', './views');
 app.locals.pretty = true;
 app.use(express.static('public'));  
 //[정적인 파일 디렉토리 설정] 이미지, 텍스트파일을 넣을수 있음

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
    <a href="/topic?id=0">Java</a><br>
    <a href="/topic?id=1">Node</a><br>
    <a href="/topic?id=2">Express</a><br><br>
    ${topics[req.params.id]}
    `
    res.send(output);
});   
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
});
