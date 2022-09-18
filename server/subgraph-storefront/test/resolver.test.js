const resolvers = require('../resolvers');
const { expect } = require('chai');
const sinon = require('sinon');

// load in schema locally ?

// verify object has token field
describe('token', () => {
  it('should pass', async () => {
    const bigc = {
      // BigCommerceStorefrontAPI
  }
    const actual = await resolvers.Query.StorefrontToken({}, {"allowed_cors_origins": [
      "https://apollographql.com"
      ],
      "channel_id": 1,
      "expires_at": 1885635176
      }, { dataSources: bigc });
    expect(actual).to.be.eql([1]);
    sinon.assert.calledOnce(bigc.Query.StorefrontToken);
  });
});
// if token field does the property match jwt spec

// verify errors are null
// if not null special handler?