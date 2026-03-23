const path=require('path')


console.log(__dirname);
console.log(__filename);

console.log(path.extname("E:\Full Stack  Learn\learn Node/node/src/path.js"));

console.log(path.basename("E:\Full Stack  Learn\learn Node/node/src/path.js"));

console.log(path.parse("E:\Full Stack  Learn\learn Node/node/src/path.js"));

console.log(path.resolve('image','category','cimg'));

console.log(path.join('/foo', 'bar', 'baz/asdf'));
