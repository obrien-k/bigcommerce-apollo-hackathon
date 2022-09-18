const resolvers = require('../resolvers');
const { expect } = require('chai');
const sinon = require('sinon');


describe('token', () => {
  // Verify object has token field
  it('StorefrontToken should return a token', async () => {
    // Uncomment below, test fails due to function data === undefined
    // sinon.replace(resolvers.Query, 'StorefrontToken', sinon.fake());
    const bigc = { BigCommerceStorefrontAPI: {getStorefrontToken: sinon.stub().resolves({ 'token': 'ko' })} };
    const actual = await resolvers.Query.StorefrontToken({}, {'allowed_cors_origins': [
      'https://apollographql.com'
      ],
      'channel_id': 1,
      'expires_at': 1885635176 // Should automate
      }, { dataSources: bigc });
    expect(actual).to.be.eql({ 'token': 'ko' });
  });
  // if token field does the property match jwt spec
  // failing
  it('token should be jwt spec', async () => {
    sinon.replace(resolvers.Query.StorefrontToken, {BigCommerceStorefrontAPI: {getStorefrontToken}}, sinon.fake());
    //resolvers.Query.StorefrontToken({ 'token' :'1' }, sinon.fake());
    // regex jwt ?
    sinon.assert.calledWithMatch(resolvers.Query.StorefrontToken({ 'token': '1' }));
    expect(actual).to.be.eql({ 'token' : '1'})
  });

});

// verify errors are null
// if not null special handler?

// restore sinon replacements
after(function () {
  sinon.restore();
});