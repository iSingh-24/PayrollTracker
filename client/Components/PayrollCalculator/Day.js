import React from "react";

const Day = ({ dayOfWeek }) => {
  return <div>{dayOfWeek ? dayOfWeek : "No Day Selected"}</div>;
};

export default Day;
