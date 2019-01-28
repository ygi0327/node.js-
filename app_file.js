var express = require('express'); // express 불러오기
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express(); // 객체화 시킴

app.use(bodyParser.urlencoded({extended: false}));
app.set('views','./view_file');
app.set('view engine', 'pug');
app.locals.pretty = true;

app.get('/topic', function(req, res){
    fs.readdir('data',function(err,files){
        if(err){
            console.log('error');
            res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files});
    });
    
});

app.get('/topic/new', function(req, res) {
    res.render('new');    
});

app.get('/topic/:id', function(req, res){
    var id = req.params.id;
    res.send(id);
});

app.post('/topic', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title, description, function(err){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.send('실행완료, ' +req.body.title);
    });
});

app.listen(3000, function(){
    console.log("test ,3000");
});   //포트 설정

