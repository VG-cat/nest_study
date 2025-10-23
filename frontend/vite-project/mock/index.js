import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { faker } from '@faker-js/faker/locale/zh_CN';  

//定义类型
const typeDefs = `#graphql
  type Query {
    hello: String
    resolved: String
  }
  type UserType {
  id: String!
  name: String!
  desc: String!

  """账户信息"""
  account: String!
  }

  type Query {
    """使用id 查询用户"""
    getUserById(id: String!): UserType
  }
`;
//不参与随机
const resolvers = {
  Query: {
    resolved: () => 'Resolved',
  },
  UserType:{
    desc:() => faker.book.publisher()
  }
};

// highlight-start
const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => faker.person.sex(),
};
// highlight-end

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    mocks, // highlight-line
    preserveResolvers:true
  }),
});

startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening`);