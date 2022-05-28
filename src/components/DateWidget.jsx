import React, { useEffect, useState } from "react";

const DateWidget = () => {
  const [date, setDate] = useState(new Date(Date.now()));

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date(Date.now())), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="date-widget-container">
      <div className="day-wrapper">
        {date.toLocaleString("en-us", { weekday: "long" })}
      </div>
      <div className="date-wrapper">{date.toLocaleDateString()}</div>
      <div className="time-wrapper">
        {date.getHours()} : {date.getMinutes()} :{" "}
        {date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}
      </div>
    </div>
  );
};

export default DateWidget;
