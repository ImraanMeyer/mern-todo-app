const request = require('supertest');
const assert = require('assert');
const should = require('should')
const app = require('../app');

describe('Todos', function() {
    it('should return unauthorized error', function(done) {

        request(app)
            .get('/api/todos')
            .expect(401, done())
    })
})