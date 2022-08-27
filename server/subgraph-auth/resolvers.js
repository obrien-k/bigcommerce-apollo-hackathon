const { AuthenticationError } = require("apollo-server");

const resolvers = {
  Query: {
    // returns account A&A
    // yeesh
    authById: async (_, {id}, context) => {
     console.log(context.user);
     /* if(!context.user) throw new AuthenticationError("authErrMessage");
      if(context.userId == '141592') {
        console.log("yay");
      }
      else {
        console.log("noo");
      }
      console.log(userId); */
      return context.dataSources.AuthSource.getAuth(id);
 
    },
    auth: async (_, __, {dataSources}) => {
      return dataSources.AuthSource.getAuth();
    }
  },
  auth: {
    __resolveReference: ({id}, {dataSources}) => {
      return dataSources.AuthSource.getAuth(id);
    }
  }

};

module.exports = resolvers;