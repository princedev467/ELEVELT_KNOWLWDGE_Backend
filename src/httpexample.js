const http = require('http')


const server = http.createServer((req, res) => {
    

    console.log(req.method);
    console.log(req.url);
    console.log(req.body);
    console.log(req.headers);
    

    //res
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({id:101,name:'amit'}))
    res.end()
    
});

// server.listen(2200,()=>{
//     console.log('localhost 2200 running');

// });

const PORT = 2200;
server.listen(PORT, () => {
    console.log(`localhost 2200 running in localhost:${PORT}`);

});