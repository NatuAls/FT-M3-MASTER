var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http.createServer((req, res) => {
    let files = fs.readdirSync(__dirname + '/images');
    files = files.filter(e => e === `${req.url.slice(1)}.jpg`);
    if(files.length){
        let img = fs.readFileSync(__dirname + `/images${req.url}.jpg`);
        return res
          .writeHead(200, {'Content-Type':'image/jpg'})
          .end(img);
    }
    else return res.writeHead(404).end('Error: 404 not found');
}).listen(3001, 'localhost');