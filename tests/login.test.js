const request = require('supertest');
const { expect } = require('chai');
const postLogin = require('../fixtures/postLogin.json');


describe('', () => {
  describe('POST /login', () => {

    it('Happy Path: 200 & valid creds', async () => {
      const bodyLogin = { ...postLogin }

      const response = await request('http://localhost:3000')
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin)
      
      expect(response.status).to.equal(200);
      expect(response.body.token).to.be.a('string');
    })
  })

})