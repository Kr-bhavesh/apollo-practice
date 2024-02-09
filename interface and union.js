import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
const typeDefs=`
union Vehicle = Car | Bike

  type Car {
    id: ID!
    manufacturer: String!
    model: String!
    transmission: String!
  }

  type Bike {
    id: ID!
    manufacturer: String!
    model: String!
    gears: Int!
  }
interface Human {
  id: ID!
  name: String!
  age: Int!
}

type Man implements Human {
  id: ID!
  name: String!
  age: Int!
  eng:String
}

type Women implements Human {
  id: ID!
  name: String!
  age: Int!
  doc: String
}

type Query {
  humans: [Human!]!
  vehicles: [Vehicle]
}
`
 const Book = [{title:"harry"},
{title:"harry part 7"}]
 const Author =[{name:"JK"},
{name:"harry smith"}]

const resolvers = {
  Query: {
    humans: () => {
      return [
        { id: "1", name: "harry", age: 21,eng:"it"},
        { id: "2", name: "Will", age: 22,doc:"dent"},
      ];
    },
  },
  Human: {
    __resolveType(humans) {
      if (humans.eng) {
        return "Man";
      } else if (humans.doc) {
        return "Women";
      }
      return null; 
    },
  },
    Vehicle: {
      __resolveType(vehicle, context, info) {
        return vehicle.transmission ? 'Car' : 'Bike';
      },
    },
    Query: {
      vehicles: () => [
        { id: '1', manufacturer: 'Toyota', model: 'Camry', transmission: 'Automatic' },
        { id: '2', manufacturer: 'Honda', model: 'Civic', transmission: 'Manual' },
        { id: '3', manufacturer: 'Harley-Davidson', model: 'Street 750', gears: 6 },
      ],
    },
};


  

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`Server ready at: ${url}`);