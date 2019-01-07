var fs= require('fs');

//Sync 동기 (한줄이 끝내야 내려옴) (처리가 순서대로)
console.log(1);
var data= fs.readFileSync('data.txt',{encoding:'utf8'});
console.log(data);

//Async 비동기 (한줄이 끝나지 않아도 내려옴) (처리 순서가 바뀔수 있음)
console.log(2);
var data2 = fs.readFile('data.txt', {encoding:'utf8'}, 
function (err, data){console.log(3); console.log(data);})
console.log(4);