import React, { useState } from "react";
import { Sparkle } from ".";
import { random, range, useRandomInterval } from "../utilities";

const generateSparkle = (color, minSize, maxSize) => {
  return {
    id: String(random(10000, 99999)),
    timeStamp: Date.now(),
    color: color,
    size: random(minSize, maxSize),
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
  color = "#FFC700",
  minSize = 10,
  maxSize = 20,
}) => {
  const [sparkles, setSparkles] = useState(() => {
    return range(3).map(() => generateSparkle(color, minSize, maxSize));
  });

  useRandomInterval(
    () => {
      if (!hidden) {
        const now = Date.now();
        const newSparkle = generateSparkle(color, minSize, maxSize);
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
