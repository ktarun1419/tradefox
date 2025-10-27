import React, { useMemo, useState } from "react";
import "./CardsCarousel.scss";
import NotificationCard from "./Cards/NotificationCard";
import FundCard from "./Cards/FundCard";
import ClockCard from "./Cards/ClockCard";

const CardCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);

  const cards = useMemo(
    () => [
      { key: "n", node: <NotificationCard /> },
      { key: "f", node: <FundCard /> },
      { key: "c", node: <ClockCard /> },
    ],
    []
  );

  // duplicate once → [A B C A B C]
  const loopCards = useMemo(() => [...cards, ...cards], [cards]);

  return (
    <div className="carousel-wrapper">
      <div
        className={`icon-cards ${isPaused ? "paused" : ""}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label="Infinite conveyor carousel"
      >
        <div className="icon-cards__viewport">
          <div className="icon-cards__track">
            {loopCards.map((item, idx) => (
              <div className="icon-cards__item" key={`${item.key}-${idx}`}>
                {item.node}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;
