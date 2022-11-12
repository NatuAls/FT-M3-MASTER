const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.status(200).send({message: 'test'});
});

app.post('/sum', (req, res) => {
  res.status(200).send({result: req.body.a + req.body.b})
})

app.post('/product', (req, res) => {
  res.status(200).send({
    result: req.body.a * req.body.b,
  });
});

app.post('/sumArray', (req,res) => {
  const {array, num} = req.body;
  let result = false;
  for(let e of array){
    for(let x of array){
      if(e !== x) {
        if(e + x === num) result = true;
      }
    };
  };
  res.status(200).send({result});
});

app.post('/numString', (req, res) => {
  const {string} = req.body;
  if(string.length > 0 && typeof string === 'string'){
    res.status(200).send({result: string.length});
  }
  else res.status(400).send({error: 'should be a string'});
});

app.post('/pluck', (req, res) => {
  const {array, property} = req.body;
  if(array instanceof Array && typeof property === 'string'){
    let result = [];
    array.forEach(obj => {
      for(let prop in obj){
        if(prop === property) result.push(obj[prop])
      }
    });
    res.status(200).send({result: result});
  } else res.status(400).send({error: 'no se pasaron los datos correctamente'});
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
