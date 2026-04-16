const request = require('supertest');
const { expect } = require('chai');

describe('', () => {
  describe('POST /login', () => {

    it('Happy Path: 200 & valid creds', async () => {
      const response = await request('http://localhost:3000')
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
          'username': 'julio.lima',
          'senha': '123456'
        })
      
      expect(response.status).to.equal(200);
      expect(response.body.token).to.be.a('string');
    })
  })

})