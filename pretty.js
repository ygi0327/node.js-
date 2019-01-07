
function hello(name) {
console.log('Hi',+name);
}
hello("egoing");  

/*
"uglify 모듈"
cmd 명령어
uglifyjs [간추릴파일.js] -o [새로만들이름.js] -m 

기본 : 뛰어쓰기 포함하여 한줄로 정리
-o : 수정된 코드 저장
-m : 기본 + 변수명 간단히
*/

function hello(o){console.log("Hi",+o)}hello("egoing");