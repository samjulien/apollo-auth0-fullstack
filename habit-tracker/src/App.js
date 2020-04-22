import React, { useState, useRef } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import "./App.css";

const HABITS_QUERY = gql`
  query HABITS_QUERY {
    habits {
      id
      description
      points
      entries {
        id
        notes
        date
        completed
      }
    }
  }
`;

const ADD_HABIT_MUTATION = gql`
  mutation ADD_HABIT_MUTATION($input: NewHabitInput) {
    createHabit(input: $input) {
      id
      description
      points
      entries {
        id
        notes
        date
        completed
      }
    }
  }
`;

function App() {
  const [description, setDescription] = useState(null);
  const { data, loading, error } = useQuery(HABITS_QUERY);
  const [createHabit, { error: mutationError }] = useMutation(
    ADD_HABIT_MUTATION,
    {
      refetchQueries: [{ query: HABITS_QUERY }],
      // update(cache, { data: { createHabit } }) {
      //   const { habits } = cache.readQuery({ query: HABITS_QUERY });
      //   cache.writeQuery({
      //     query: HABITS_QUERY,
      //     data: { habits: habits.concat([createHabit]) },
      //   });
      // },
    }
  );

  const descriptionInput = useRef(null);

  const handleChange = () => {
    const { value } = descriptionInput.current;
    setDescription(value);
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && description) {
      addHabit(e);
    }
  };

  const addHabit = (e) => {
    e.preventDefault();
    createHabit({ variables: { input: { description } } });
    descriptionInput.current.value = "";
    setDescription("");
  };

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Ruh roh! {error.message}</p>;
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: "10px" }}>
        Habit Tracker{" "}
        <span role="img" aria-label="muscle emoji">
          💪
        </span>
      </h2>
      <div style={{ marginBottom: "10px" }}>
        <a href="#" style={{ textDecoration: "none" }}>
          Log In
        </a>
      </div>
      {mutationError && <p>Error! {mutationError.message}</p>}
      <input
        type="text"
        placeholder="What are you gonna do?"
        name="description"
        ref={descriptionInput}
        onChange={handleChange}
        onKeyDown={onEnterPress}
      />
      <button type="button" disabled={!description} onClick={addHabit}>
        Add
      </button>
      <ul>
        {data.habits.map((habit) => {
          return (
            <li key={habit.id}>
              {`${habit.description} (${habit.points} points)`}
              <ul>
                {habit.entries &&
                  habit.entries.map((entry) => {
                    const date = new Date(entry.date).toLocaleDateString();
                    const completed = entry.completed ? "✅" : "😑";
                    return (
                      <li
                        key={entry.id}
                      >{`${date}: ${entry.notes} ${completed}`}</li>
                    );
                  })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
