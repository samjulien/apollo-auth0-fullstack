import React from "react";

function Error({ error }) {
  return (
    <div className="container">
      <p>Ruh roh! {error.message}</p>
    </div>
  );
}

export default Error;
