//ToDo - вам необходимо скопировать данный скрипт в свой проект, и сдавать ДЗ в рамках собственного репозитория


// 1) Какие виды областей видимости вы знаете? Написать ответ ниже
//Есть глобальная область, блочная, локальная , область видимости catch и область видимости eval().

// 2) Исправьте код так чтобы в консоль выводились числа от 0 до 10
for (let i = 0; i <= 10; i++) {
    setTimeout(() => {
        console.log(i);
    }, 0)
}


// 3) Исправьте код так чтобы в консоль выводилось "John"
var firstName = "Elena"
const foo = ()=> {
    debugger
    return this
};
const foo2 = function (){
    debugger
    return this;
}
const obj = {
    firstName: 'John',
    sayFirstName: function (){
        debugger
        console.log(this.firstName)
    },
    foo:foo,
    foo2:foo2,
    foo3: function (){
        debugger
        return this
    }
}
obj.sayFirstName();
console.log(obj.foo());
console.log(obj.foo2());
console.log(obj.foo3())

// 4) Исправьте код так чтобы в консоль не выводилась ошибка (нельзя исправлять тело функции getArrowFunction)
const user = {
    age: 20
}
function getArrowFunction() {
    "use strict"
    return () => {
        console.log(this.age)
    }
}
//1
/*
const arrowFunction = getArrowFunction.bind(user);
const newArrow = arrowFunction();
newArrow();*/
//2
const arrowFunction = getArrowFunction.call(user);
arrowFunction();
