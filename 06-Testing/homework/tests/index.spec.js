const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toBe(5);
        })
    );
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toBe(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.post('/sumArray').send({array: [2,1], num: 3}).expect(200));
    it('responds with true', () => {
      return agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toBe(true);
        });
    });
    it('responds with false', () => {
      return agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 50})
        .then((res) => {
          expect(res.body.result).toBe(false);
        });
    });
    it('you shoul not add the same number twice', () => {
      return agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,49], num: 4})
        .then((res) => {
          expect(res.body.result).toBe(false);
        });
    });
  });

  describe('POST /numString', () => {
    it('responds with 200', () => agent.post('/numString').send({string: 'x'}).expect(200));
    it('responds with 4', () => {
      return agent.post('/numString')
        .send({string: 'hola'})
        .then((res) => {
          expect(res.body.result).toBe(4);
        });
    });
    it('responds with 400 when there is an empty string' , () =>
      agent.post('/numString').send({string: ''}).expect(400)
    );
    it('respond with 400 when there is a number' , () => {
      return agent.post('/numString').send({string: 12}).expect(400);
    });
  });

  describe('POST /pluck', () => {
    it('responds with 200', () => agent.post('/pluck').send({array: [{name: 'natu'}], property: 'name'}).expect(200));
    it('responds with pluck functionality', () => {
      return agent.post('/pluck')
        .send({array: [{name: 'natu'}, {age: 24}, {name: 'bruce'}], property: 'name'})
        .then((res) => {
          expect(res.body.result).toEqual(['natu', 'bruce']);
        });
    });
    it('responds with 400 when prop is not array' , () =>
      agent.post('/pluck').send({array: 12, property: ''}).expect(400)
    );
    it('respond with 400 when prop is not string' , () =>
      agent.post('/pluck').send({array: [], property: 12}).expect(400)
    );
  });

});

