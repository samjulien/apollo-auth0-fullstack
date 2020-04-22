import React, { useRef, useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useAuth0 } from "./utils/auth";
import { HABITS_QUERY } from "./App";

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

function AddHabit() {
  const [description, setDescription] = useState(null);
  // const { isAuthenticated, getTokenSilently } = useAuth0();
  // const [bearerToken, setBearerToken] = React.useState("");

  // useEffect(() => {
  //   const getToken = async () => {
  //     const token = isAuthenticated ? await getTokenSilently() : "";
  //     setBearerToken(`Bearer ${token}`);
  //   };
  //   getToken();
  // }, [getTokenSilently, isAuthenticated]);

  const [createHabit, { error: mutationError }] = useMutation(
    ADD_HABIT_MUTATION,
    {
      // context: {
      //   headers: {
      //     authorization: bearerToken,
      //   },
      // },
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
  return (
    <>
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
    </>
  );
}

export default AddHabit;
