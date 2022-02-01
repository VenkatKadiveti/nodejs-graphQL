var { buildSchema } = require('graphql');

const schema = buildSchema(`
type User {
    _id: ID
    first_name: String!
    last_name: String!
    email: String!
}

type authUser {
    _id: ID
    first_name: String!
    last_name: String!
    email: String!
    token: String!
}

input userInput {
    first_name: String!
    last_name: String!
    email: String!
    password: String!  
}

input AthenticateInput {
    email: String!
    password: String!
}

type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
}
input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: String!
}

type RootQuery {
    events: [Event!]!
    isAuth(auth: AthenticateInput!) : authUser!
    getUsers: [User!]!
    getUser(email:String) : [User!]!
}

type RootMutation {
    createEvent(eventInput: EventInput!): Event
    createUser(userData: userInput!): String!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)

module.exports = schema;