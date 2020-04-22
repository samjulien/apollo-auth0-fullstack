module.exports = {
  habits: [
    {
      id: 1,
      description: "Floss every day",
      points: 10,
    },
    {
      id: 2,
      description: "Feed chickens",
      points: 0,
    },
  ],
  entries: [
    {
      id: 1,
      date: new Date("4/6/2020"),
      notes: "Done!",
      completed: true,
      habitId: 1,
    },
    {
      id: 2,
      date: new Date("4/3/2020"),
      notes: "Uh oh, I forgot.",
      completed: false,
      habitId: 2,
    },
  ],
};
