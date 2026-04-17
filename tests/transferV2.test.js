const { expect } = require('chai');
const request = require('supertest');
require('dotenv').config();

describe('Transfer testing', () => {

  describe('POST /transferencias', () => {

    it('V2: sucesso, 201 ', async () => {
      //Capturar o token
      const responseLogin = await request(process.env.BASE_URL)
              .post('/login')
              .set('Content-Type', 'application/json')
              .send({
                'username': 'julio.lima',
                'senha': '123456'
              })

      const token = responseLogin.body.token

      // Fazendo a transferência        
      const response = await request(process.env.BASE_URL)
      .post('/transferencias')
      .set('Content-Type', "application/json")
      .set('Authorization', `Bearer ${token}`) // Usar o token capturado
      .send(
          {
            'contaOrigem': 1,
            'contaDestino': 2,
            'valor': 11,
            'token': ''
      });

      expect(response.status).to.equal(201);
      console.log(response.body);
    })

    it('V2: falha (valor < 10), 422 ', async () => {
 //Capturar o token
      const responseLogin = await request(process.env.BASE_URL)
              .post('/login')
              .set('Content-Type', 'application/json')
              .send({
                'username': 'julio.lima',
                'senha': '123456'
              })

      const token = responseLogin.body.token

      // Fazendo a transferência        
      const response = await request(process.env.BASE_URL)
      .post('/transferencias')
      .set('Content-Type', "application/json")
      .set('Authorization', `Bearer ${token}`) // Usar o token capturado
      .send(
          {
            'contaOrigem': 1,
            'contaDestino': 2,
            'valor': 9.99,
            'token': ''
      });

      expect(response.status).to.equal(422);
      console.log(response.body);
    })
  })
})