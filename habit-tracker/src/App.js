import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useAuth0 } from "./utils/auth";
import "./App.css";
import AddHabit from "./AddHabit";
import Loading from "./Loading";
import Error from "./Error";
import Habit from "./Habit";

export const HABITS_QUERY = gql`
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

function App() {
  const {
    loading: authLoading,
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
  } = useAuth0();
  const { data, loading, error } = useQuery(HABITS_QUERY);

  if (loading || authLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="container">
      <div>
        <h2 style={{ marginBottom: "10px" }}>
          Habit Tracker{" "}
          <span role="img" aria-label="muscle emoji">
            💪
          </span>
        </h2>
        {!isAuthenticated && (
          <button
            onClick={loginWithRedirect}
            type="button"
            style={{ cursor: "pointer" }}
          >
            Log In
          </button>
        )}
      </div>
      <div style={{ marginBottom: "10px" }}>
        {isAuthenticated && (
          <>
            Welcome, {user.name}
            <span role="img" aria-label="muscle emoji">
              👋
            </span>
            !
            <button
              onClick={logout}
              type="button"
              style={{ fontSize: "12px", cursor: "pointer" }}
            >
              Log Out
            </button>
            <br />
            <AddHabit />
          </>
        )}
      </div>
      <ul style={{ margin: "10px", paddingInlineStart: "15px" }}>
        {data.habits.map((habit) => {
          return <Habit key={habit.id} habit={habit} />;
        })}
      </ul>
    </div>
  );
}

export default App;
