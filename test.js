// function AAA(){
//     const a = 'aaa';
//     this.this = 'this_';
//     this.BBB = function(){
//         return a + 'bbb';
//     }
// }

// AAA.prototype.CCC = function(){
//     return this.this;
// }


// const objA = new AAA();
// const objB = new AAA();
// if(objA === objB){
//     console.log('같다')
// }else{
//     console.log('다르다');
// }

// //console.log(objA)
// console.log(objA.CCC())



// var obj = {
//     string: 'zero',
//     yell: function () {
//         console.log(this.string);
//     }
// };

// var obj2 = {
//     string: 'what?'
// };
// obj.yell(); // 'zero';
// obj.yell.call(obj2); // 'what?'

var obj = {
    string: 'zero',
    yell: function () {
        console.log(this.string);
    }
};
var obj2 = {
    string: 'what?'
};
var yell2 = obj.yell.bind(obj2);
obj.yell(); // 'zero';
yell2(); // 'what?'
