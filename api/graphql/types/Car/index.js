export default `
  type Car {
    _id: String!
    model: String!
    manufacturer: String!
    priceTotal: Float
    priceMonthly: Float
    runtime: Float
    energy: String
    basicOptions: [String]
    buildType: String
  }

  type Query {
    car(_id: ID!): Car!
    cars: [Car!]!
  }

  type Mutation {
    createCar(car: CreateCarInput): Car!
    updateCar(_id: String!, car: UpdateCarInput!): Car!
    deleteCar(_id: String!): Car!
  }

  input CreateCarInput {
    model: String!
    manufacturer: String!
    priceTotal: String
    priceMonthly: String
    runtime: String
    energy: String
    basicOptions: [String]
    buildType: String
  }
  
  input UpdateCarInput {
    model: String
    manufacturer: String
    priceTotal: Float
    priceMonthly: Float
  } 
`;
