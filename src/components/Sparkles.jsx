import React, { useState } from "react";
import { Sparkle } from ".";
import { random, range, useRandomInterval } from "../utilities";

const generateSparkle = () => {
  return {
    id: String(random(10000, 99999)),
    timeStamp: Date.now(),
    color: "#FFC700",
    size: random(10, 20),
    style: {
      top: random(0, 100) + "%",
      left: random(0, 95) + "%",
      zIndex: 2,
    },
  };
};

const Sparkles = ({
  children,
  showOnlyOnHover,
  hidden,
  showOnlyOnFocusWithin,
}) => {
  const [sparkles, setSparkles] = useState(() => {
    return range(3).map(() => generateSparkle());
  });

  useRandomInterval(
    () => {
      if (!hidden) {
        const now = Date.now();
        const newSparkle = generateSparkle();
        const newSparkles = sparkles.filter((s) => {
          const delta = now - s.timeStamp;
          return delta < 1000;
        });
        newSparkles.push(newSparkle);
        setSparkles(newSparkles);
      }
    },
    50,
    500
  );

  return (
    <span
      className={`sparkles ${
        showOnlyOnHover
          ? "on-hover"
          : showOnlyOnFocusWithin
          ? "focus-within"
          : hidden
          ? "hidden"
          : ""
      }`}
    >
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <strong className="child-wrapper">{children}</strong>
    </span>
  );
};

export default Sparkles;
