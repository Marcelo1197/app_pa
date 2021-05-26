//INFO: 
//U: elegi esta libreria porque la usa Dash con React en sus componentes

//VER: https://ramdajs.com/docs/

const R = require('ramda'); //U: en node

const greet = R.replace('AcaVaElNombre', R.__, 'Hello, AcaVaElNombre!');
console.log( greet('Alice') ); //=> 'Hello, Alice!'

console.log(R.take(2,'Hola'))
console.log(R.map(R.take(2), ['Hola','Que','Tal']))
