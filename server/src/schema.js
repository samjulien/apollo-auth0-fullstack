const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  type Habit {
    id: ID!
    description: String
    points: Int!
    entries: [Entry]!
  }

  input NewHabitInput {
    description: String
  }

  input UpdateHabitInput {
    id: ID!
    description: String
  }

  type Entry {
    id: ID!
    date: Date!
    notes: String
    completed: Boolean!
    habitId: ID!
  }

  input NewEntryInput {
    date: Date!
    notes: String
    completed: Boolean!
    habitId: ID!
  }

  input UpdateEntryInput {
    id: ID!
    date: Date
    notes: String
    completed: Boolean
  }

  type DeleteResponse {
    success: Boolean!
  }

  type Query {
    habits: [Habit]!
    getHabitById(id: ID!): Habit!
    entries: [Entry]!
    getEntryById(id: ID!): Entry!
  }

  type Mutation {
    createHabit(input: NewHabitInput): Habit!
    updateHabit(input: UpdateHabitInput): Habit!
    deleteHabit(id: ID): DeleteResponse!
    createEntry(input: NewEntryInput): Entry!
    updateEntry(input: UpdateEntryInput): Entry!
    deleteEntry(id: ID): DeleteResponse!
  }
`;

module.exports = { typeDefs };
