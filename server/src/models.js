const data = require("./data");

const getHabits = (filter) => {
  if (!filter) {
    return data.habits;
  }

  return data.habits.filter(filter);
};

const getHabitById = (habitId) => {
  let habit = data.habits.find((h) => +h.id === +habitId);
  if (!habit) {
    throw new Error("Not found");
  }
  return habit;
};

const addHabit = (newHabitInput) => {
  const newId = data.habits.length + 1;
  const habitToAdd = { id: newId, points: 0, entries: [], ...newHabitInput };
  data.habits.push(habitToAdd);
  return habitToAdd;
};

const updateHabit = (updateHabitInput) => {
  let habit = getHabitById(updateHabitInput.id);
  habit.description = updateHabitInput.description;
  return habit;
};

const deleteHabit = (habitId) => {
  const habit = getHabitById(habitId);
  const entries = getEntriesByHabitId(habitId);
  if (entries.length > 0) {
    for (i = 0; i < entries.length; i++) {
      let entryId = entries[i].id;
      deleteEntry(entryId);
    }
  }
  const index = data.habits.indexOf(habit);
  data.habits.splice(index, 1);
  return { success: true };
};

const getEntries = (filter) => {
  if (!filter) {
    return data.entries;
  }

  return data.entries.filter(filter);
};

const getEntryById = (entryId) => {
  let entry = data.entries.find((e) => +e.id === +entryId);
  if (!entry) {
    throw new Error("Not found");
  }
  return entry;
};

const getEntriesByHabitId = (habitId) => {
  return getEntries((e) => +e.habitId === +habitId);
};

const addEntry = (newEntryInput) => {
  const habit = getHabitById(newEntryInput.habitId);
  if (!habit) {
    throw new Error("Habit not found");
  }
  const newId = data.entries.length + 1;
  const entryToAdd = { id: newId, ...newEntryInput };
  data.entries.push(entryToAdd);
  updatePoints(newEntryInput.habitId);
  return entryToAdd;
};

const updateEntry = (updateEntryInput) => {
  let entry = data.entries.find((e) => +e.id === +updateEntryInput.id);

  if (!entry) {
    throw Error("Not found");
  }

  const updatedEntry = {
    ...entry,
    date: updateEntryInput.date ? updateEntryInput.date : entry.date,
    notes: updateEntryInput.notes ? updateEntryInput.notes : entry.notes,
    completed: updateEntryInput.completed
      ? updateEntryInput.completed
      : entry.completed,
  };

  const index = data.entries.indexOf(entry);
  data.entries[index] = updatedEntry;

  updatePoints(updatedEntry.habitId);

  return updatedEntry;
};

const deleteEntry = (entryId) => {
  const entry = getEntryById(entryId);
  const index = data.entries.indexOf(entry);
  data.entries.splice(index, 1);
  return { success: true };
};

const updatePoints = (habitId) => {
  const completedEntries = data.entries.filter(
    (e) => +e.habitId === +habitId && e.completed
  );
  const points = completedEntries.length * 10;
  let habit = data.habits.find((h) => +h.id === +habitId);
  habit.points = points;
};

module.exports = {
  getHabits,
  getHabitById,
  addHabit,
  updateHabit,
  deleteHabit,
  getEntries,
  getEntryById,
  getEntriesByHabitId,
  addEntry,
  updateEntry,
  deleteEntry,
};
