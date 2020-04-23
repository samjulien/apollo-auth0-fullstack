const { GraphQLDateTime } = require("graphql-iso-date");
const { UserInputError, AuthenticationError } = require("apollo-server");
const db = require("./models");

const resolvers = {
  Date: GraphQLDateTime,
  Habit: {
    entries(parent, args, ctx, info) {
      return db.getEntriesByHabitId(parent.id);
    },
  },
  Query: {
    habits() {
      return db.getHabits();
    },
    getHabitById(_, { id }) {
      return db.getHabitById(id);
    },
    entries() {
      return db.getEntries();
    },
    getEntryById(_, { id }) {
      return db.getEntryById(id);
    },
  },
  Mutation: {
    createHabit(_, { input }, { auth }) {
      if (!auth.isAuthenticated) {
        throw new AuthenticationError("Not logged in!");
      }
      if (!input.description) {
        throw new UserInputError("Description missing!");
      }
      return db.addHabit(input);
    },
    updateHabit(_, { input }) {
      return db.updateHabit(input);
    },
    deleteHabit(_, { id }) {
      return db.deleteHabit(id);
    },
    createEntry(_, { input }) {
      return db.addEntry(input);
    },
    updateEntry(_, { input }) {
      return db.updateEntry(input);
    },
    deleteEntry(_, { id }) {
      return db.deleteEntry(id);
    },
  },
};

module.exports = { resolvers };
