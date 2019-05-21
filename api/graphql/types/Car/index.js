export default `
  type Car {
    _id: String!
    model: String!
    manufacturer: String!
    priceTotal: Float
    priceMonthly: Float
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
    priceTotal: Float
    priceMonthly: Float
  }
  
  input UpdateCarInput {
    model: String
    manufacturer: String
    priceTotal: Float
    priceMonthly: Float
  } 
`
