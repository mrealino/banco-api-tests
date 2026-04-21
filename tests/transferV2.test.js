const { expect } = require('chai');
const request = require('supertest');
const { obterToken } = require('../helpers/login.js');
const postTransfer = require('../fixtures/postTransfer.json');
require('dotenv').config();

describe('Transfer testing', () => {

  let token //declarando a variável fora do hook pois ela será também usada dentro do it (set.auth_bearerToken)

  beforeEach( async () => { //criando esse Hook para executar a função obterToken do Helper antes de cada it
      token = await obterToken('julio.lima', '123456');
  })

  describe('POST /transferencias', () => {

    it('V2: POST sucesso, 201 ', async () => {
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

  describe('GET /transferencias/{id}', () => {

    it('get Transfers (id)', async () => {
    const resposta = await request(process.env.BASE_URL)
        .get('/transferencias/10')
        .set('Authorization', `Bearer ${token}`) 

    expect(resposta.status).to.equal(200)
    expect(resposta.body.id).to.equal(10)
    expect(resposta.body.id).to.be.a('number')
    expect(resposta.body.conta_origem_id).to.equal(1)
    expect(resposta.body.valor).to.be.a('string')

    })
    
  })

  describe('GET /transferencias', () => {
    it('validar tamanho do body de resposta', async () => {
      const resposta = await request(process.env.BASE_URL)
      .get('/transferencias?page=1&limit=10')
      .set('Authorization', `Bearer ${token}`)

      expect(resposta.status).to.equal(200)
      expect(resposta.body.limit).to.equal(10)
      expect(resposta.body.transferencias).to.have.lengthOf(10) // para vetores, utilizar essa assertion 'lengthOf' para validar quantidade de objetos no array
      

    }) 


  })
})