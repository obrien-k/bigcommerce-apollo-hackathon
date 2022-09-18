const resolvers = require('../resolvers');
const { expect } = require('chai');
const sinon = require('sinon');

// verify object has token field
describe('token', () => {
  it('should pass', async () => {
    const bigc = {
      "data": {
          "StorefrontToken": {
            "data": {
              "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOlsiaHR0cHM6Ly9hcG9sbG9ncmFwaHFsLmNvbSJdLCJlYXQiOjE4ODU2MzUxNzYsImlhdCI6MTY2MzQwMjgxOCwiaXNzIjoiQkMiLCJzaWQiOjEwMDE2MTA0NzcsInN1YiI6ImxibnlwOWR1NWw0bnJ2ZmZ6bHExdDcyc2Q1eDZ6ODciLCJzdWJfdHlwZSI6MiwidG9rZW5fdHlwZSI6MX0.pRlSqjwufarM3sD-XY5UpTSTAbFfrqVHZYOBXd4jAok_AJr4P_djlCRDv16KC-Kb6AP-WHZ9L3PWNwG19S7MKw"
            },
            "errors": null
          },
    }
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