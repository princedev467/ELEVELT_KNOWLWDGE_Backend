const url=require('url')

// const gurl="https://nodejs.org/api/os.html#osavailableparallelism"
// console.log(url.parse(gurl));

// const obj={
//      protocol: 'https:',
//      hostname:'w3school.com',
//      href:'https://www.w3schools.in'
// }

// console.log(url.format(obj));

console.log(url.resolve('/one/two/three', 'four'));
console.log(url.resolve('/one/two/three', '/four'));
console.log(url.resolve('http://example.com', '/one'));
console.log(url.resolve('http://example.com/one', '/two'));


    
 