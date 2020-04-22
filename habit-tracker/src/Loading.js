import React from "react";

function Loading() {
  return (
    <div className="container">
      <p>
        Loading...{" "}
        <span role="img" aria-label="timer emoji">
          ⏱
        </span>
      </p>
    </div>
  );
}

export default Loading;
