const resolvers = require('../resolvers');
const { expect } = require('chai');
const sinon = require('sinon');

// load in schema locally ?

// verify object has token field
describe('token', () => {
  it('should pass', async () => {
    sinon.replace(resolvers.Query, 'StorefrontToken', sinon.fake());
    resolvers.Query.StorefrontToken({ 'token': 'ko' }, sinon.fake());
    const bigc = { 'token' : 'ko' }
    const actual = await resolvers.Query.StorefrontToken({}, {'allowed_cors_origins': [
      'https://apollographql.com'
      ],
      'channel_id': 1,
      'expires_at': 1885635176
      }, { dataSources: bigc });
    expect(actual).to.be.eql({ 'token': 'ko' });
    
  });
});
// if token field does the property match jwt spec

// attempt at mocking server data
describe('server mock', () => {
  it('paste change this'), async () => {
    sinon.replace(resolvers.Query, 'StorefrontToken', sinon.fake());
    resolvers.Query.StorefrontToken({ 'channel_id' :'1' }, sinon.fake());
    sinon.assert.calledWithMatch(resolvers.Query({ 'token': 'ko' }));
    expect(actual).to.be.eql({ 'token' : 'ko'})
  }
});
// verify errors are null
// if not null special handler?
after(function () {
  sinon.restore();
});