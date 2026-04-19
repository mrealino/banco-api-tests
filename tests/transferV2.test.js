const { expect } = require('chai');
const request = require('supertest');
const { obterToken } = require('../helpers/login.js');
const postTransfer = require('../fixtures/postTransfer.json');
require('dotenv').config();

describe('Transfer testing', () => {

  describe('POST /transferencias', () => {
    let token //declarando a variável fora do hook pois ela será também usada dentro do it (set.auth_bearerToken)

    beforeEach( async () => { //criando esse Hook para executar a função obterToken do Helper antes de cada it
      token = await obterToken('julio.lima', '123456');
    })

    it('V2: sucesso, 201 ', async () => {
     const bodyTransfer = { ...postTransfer }
      // Fazendo a transferência        
      const response = await request(process.env.BASE_URL)
      .post('/transferencias')
      .set('Content-Type', "application/json")
      .set('Authorization', `Bearer ${token}`) // Usar o token capturado
      .send(bodyTransfer);

      expect(response.status).to.equal(201);
      console.log(response.body);
    })

    it('V2: falha (valor < 10), 422 ', async () => {
      const bodyTransfer = { ...postTransfer }
      bodyTransfer.valor = 9.99;

      // Fazendo a transferência        
      const response = await request(process.env.BASE_URL)
      .post('/transferencias')
      .set('Content-Type', "application/json")
      .set('Authorization', `Bearer ${token}`) // Usar o token capturado
      .send(bodyTransfer);

      expect(response.status).to.equal(422);
      console.log(response.body);
    })
  })
})