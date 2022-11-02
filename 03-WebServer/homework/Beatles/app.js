var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http.createServer((req, res) => {

  const beatleName = req.url.split('/').pop().replace('%20', ' ');

  if(req.url === '/'){
    let myHtml = fs.readFileSync(__dirname + '/index.html');
      return res
        .writeHead(200, {'Content-Type':'text/html'})
        .end(myHtml);
  }
  
  if(req.url === '/api'){
    return res
      .writeHead(200, {'Content-Type':'application/json'})
      .end(JSON.stringify(beatles));
  }

  if(req.url.includes('/api') && beatleName){
    let beatle = beatles.filter(e => e.name === beatleName);
    if(!beatle.length) return res.writeHead(404).end('Error 404: Not Found');
    return res
      .writeHead(200, {'Content-Type':'application/json'})
      .end(JSON.stringify(beatle[0]));
  }

  if(req.url.includes('/card') && beatleName){
    let beatle = beatles.filter(e => e.name === beatleName);
    if(!beatle.length) return res.writeHead(404).end('Error 404: Not Found');

    let myHtml2 = fs.readFileSync(__dirname + '/beatle.html', 'utf8');
    myHtml2 = myHtml2.replace('{img}', beatle[0].profilePic);
    myHtml2 = myHtml2.replace(/{name}/gi, beatle[0].name);
    myHtml2 = myHtml2.replace('{birth}', beatle[0].birthdate);
    
    return res
      .writeHead(200, {'Content-Type':'text/html'})
      .end(myHtml2);
  }
}).listen(3001, 'localhost');
